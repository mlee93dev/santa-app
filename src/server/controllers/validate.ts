import { Request, Response } from 'express';
import userProfiles from '../../../json/userProfiles.json';
import users from '../../../json/users.json';

type SantaRequest = {
  name: string,
  address: string,
  gifts: string
};

const pendingRequests = {
  requests: <SantaRequest[]>[],
  addRequest: function (request: SantaRequest) {
    this.requests.push(request);
  },
  clearRequests: function () {
    this.requests = [];
  }
};

const validate = async (req: Request, res: Response) => {
  try {
    const {name, gifts} = req.body.user;

    const matchingUid = users.find(user => user.username === name)?.uid;
    if (!matchingUid) {
      return res.status(404).send(`Sorry, you are not on Santa's nice list this year!`);
    }
    const matchingUserProfile = userProfiles.find(profile => profile.userUid === matchingUid);
    if (!matchingUserProfile) {
      return res.status(404).send(`Sorry, you are not on Santa's nice list this year!`);
    }
    const matchingBirthdate = matchingUserProfile.birthdate;
    const splitBirthdate = matchingBirthdate.split('/');
    const moreThanTenYearsOld = splitBirthdate && (Date.now() - Date.parse(`${splitBirthdate[0]}/${splitBirthdate[2]}/${splitBirthdate[1]}`) >= 347126472000) ? true : false;
    if (moreThanTenYearsOld) {
      return res.status(404).send(`Sorry, you are too old to believe in Santa!`);
    }

    pendingRequests.addRequest({
      name: name,
      address: matchingUserProfile.address,
      gifts: gifts
    })

    return res.status(200).send('Santa has received your wish!');
  } catch (e) {
    console.log(e);
  }
};

export { validate, pendingRequests };
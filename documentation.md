# DOCUMENTATION

## Build Instructions

1. First install the packages and dependencies required by the project:

`npm install`

2. Then build the front end (we utilize the provided Vite package's build feature):

`npm run build`

3. Then start the server:

`npm start`

The server will be hosted on http://localhost:3000/ by default.

To stop the server, press CTRL + C.

## Packages

The following packages have been added to the project:

### Back end
- path, url: For setting the appropriate local `/dist` directory on which we will build the front end to, and from which the server will serve the bundled front end application.
- dotenv/config: For enabling the use of `.env` which will allow us to set sensitive data without committing to the repo.
- nodemailer: For enabling the use of SMTP service to Ethereal.
- tsx: For running Node.js with TypeScript and enabling Node load module type packages.

### Front end
- react-router: Since we will to rout the users to different pages based on whether they passed server-side validation or not.

### Misc
For`tsconfig.json`, `esModuleInterop` had to be set to `true` for Node to use modules, `server.ts` had to be included, and `"outDir": "./dist"` had to be added for the front end build directory.

## Folder Structure
Aside from server.ts and index.html which are situated in the root directory, separate directories were created for both the front end and back end in `src`.

The back end is broken into the controllers and routes folders.
The front end is broken into the components and pages folders.

## Architecture - Front end
`main.tsx` initializes React and React router with its respective routes - namely the root (with the default form), `Success` and `Error`.
The default `style.css` is used.

`App.tsx` acts as the main parent component, bringing together the two components - `Body` and `Header`.
`Header.tsx` has the default head HTML from the original `src/view/` directory.
`Body.tsx` - in addition to the origin body HTML, React logic has been added to handle state and the form behavior with the server. The client makes a POST call to the `/validate` endpoint with the user entered name and gifts text.
- We use react-router's `useNavigate` API to programmatically navigate to the respective pages (`Success` and `Error`) depending on the server response code, sending the appropriate response message in the process.
- On the pages themselves, we use react-router's `useLocation` API to retrieve the above message and set the state on page load using the `useEffect` Hooks API.

## Architecture - Back end
Typescript was also chosen for the back end for consistency with the front end's use of TypeScript.

`server.ts` handles the server initiation, router declaration, front end build directory declaration, email setup, and server termination logic. Credentials for email are retrieved from `.env`.
For emails, we make sure to only send emails if there are pending requests, and on every successful send, we make sure to clear the sent requests.

`src/routes/index.ts` acts as the main router 'gateway' for the controllers in our server, which consists of just `validate.ts`;

`src/controllers/validate.ts` handles the logic for the validation of requests from the front end. It takes the in-memory JSON data needed from `/json`, which would normally be an API endpoint(s), and then finds a match with the name from the request body. No match results in 404 responses with the appropriate message depending on the type of mismatch. For the birthdate string specifically, string manipulation is needed to transform the original `YYYY/DD/MM` format to the format that `Date.parse()` recognizes - `YYYY/MM/DD`. 
In addition, the requests object is initialized here and used as a named export for use in `server.ts` to transfer the pending requests data to be sent as email to Ethereal. On successful validation, we construct the requests and add to the pending requests array.
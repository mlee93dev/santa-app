import express, { Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import appRouter from './src/server/routes';
import nodemailer from 'nodemailer';
import 'dotenv/config';
import { pendingRequests } from './src/server/controllers/validate';
const __filename = fileURLToPath(import.meta.url);
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("combined"));

app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());

app.use('/api', appRouter);

app.get('/', (request: Request, response: Response) => {
  response.sendFile(path.dirname(__filename) + '/dist/index.html');
});

app.use(express.static(path.dirname(__filename) + '/dist/'));

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
  }
});

const sendPendingRequests = setInterval(() => {
  if (pendingRequests.requests.length > 0) {
    const message = JSON.stringify({
      pendingRequests: pendingRequests.requests
    });
    transporter.sendMail({
      from: "do_not_reply@northpole.com",
      to: "santa@northpole.com",
      subject: "Pending wishes",
      text: message,
      html: `<p>${message}</p>`,
    }, (err, info) => {
      if (err) {
        console.log('Error occurred. ' + err.message);
        return process.exit(1);
      }
      console.log('Message sent: ', info.messageId);
      pendingRequests.clearRequests();
    });
  }
}, 15000);

app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});

const stopServer = async () => {
  clearInterval(sendPendingRequests);
  console.log('Stopping server.');
  process.exit(0);
};

process
  .once('SIGTERM', () => stopServer())
  .once('SIGINT', () => stopServer());

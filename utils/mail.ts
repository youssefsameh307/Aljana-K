import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import connectMongo from "./database";
import Users from "../models/userModel";
import Record from "../models/recordModule";

let config = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};
const transporter = nodemailer.createTransport(config);
// Create a Mailgen instance
// Configure mailgen by setting a theme and your product info

export interface MailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}
export default async function sendMail(config: MailOptions) {
  const info = await transporter.sendMail({
    from: "kokodumb1@gmail.com", // sender address
    to: config.to, // list of receivers
    subject: config.subject, // Subject line
    text: config.text, // plain text body
    html: config.html, // html body
  });
}

interface PredefinedMailOptions {
    to: string;
}

export async function sendNewFeedbackMail(config: PredefinedMailOptions) {
  const info = await transporter.sendMail({
    from: "kokodumb1@gmail.com", // sender address
    to: config.to, // list of receivers
    subject: "Feedback Notification", // Subject line
    text: "Please check feedback on your account", // plain text body
    html: `<h1>Click the button to redirect</h1>
        <a id="redirectLink" href="${process.env.PUBLIC_URL}/user/records">
        <button>Go to my feedback</button>
        </a>`, // html body
  });
}

export async function sendNewFeedbackMailByID(patientID: string) {
  // get patient email
  await connectMongo();
  let patient = await Users.findOne({ _id: patientID })


  const info = await transporter.sendMail({
    from: "kokodumb1@gmail.com", // sender address
    to: patient.email, // list of receivers
    subject: "Feedback Notification", // Subject line
    text: "Please check feedback on your account", // plain text body
    html: `<h1>Click the button to redirect</h1>
        <a id="redirectLink" href="${process.env.PUBLIC_URL}/user/records">
        <button>Go to my feedback</button>
        </a>`, // html body
  });
}

export async function sendNewFeedbackMailByRecordID(recordID: string) {
  // get patient email
  await connectMongo();
  let record = await Record.findOne({ _id: recordID });
  let patient = await Users.findOne({ _id: record?.patient });

  const info = await transporter.sendMail({
    from: "kokodumb1@gmail.com", // sender address
    to: patient.email, // list of receivers
    subject: "Feedback Notification", // Subject line
    text: "Please check feedback on your account", // plain text body
    html: `<h1>Click the button to redirect</h1>
        <a id="redirectLink" href="${process.env.PUBLIC_URL}/user/records">
        <button>Go to my feedback</button>
        </a>`, // html body
  });
}

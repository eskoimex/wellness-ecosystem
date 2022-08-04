// import dotenv from "dotenv";
// dotenv.config();
// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.sendGridKey);
// let senderEmail = process.env.sendGridSender;

// interface emailData {
//   subject: string;
//   html: string | undefined;
// }

// export const sendEmail = async (emailData: emailData, receiver: string) => {
//   let err, sent;
//   try {
//     sent = await sgMail.send({ ...emailData, to: receiver, from: senderEmail });
//     return { err, sent };
//   } catch (err) {
//     return { err, sent };
//   }
// };

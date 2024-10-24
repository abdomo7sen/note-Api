import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { emailHtml } from "./emailHtml.js";
export const sendEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // wtf is this ?? store all of these in ur .env pls
    auth: {
      user: "abdomohsen20006@gmail.com", // wtf is this ?? store all of these in ur .env pls
      pass: "ckqzlpjqatavlfvy", // wtf is this ?? store all of these in ur .env pls
    },
  });
  jwt.sign({ email }, process.env.SECRET_KEY, async (err, token) => {
    // wtf is this ?? store all of these in ur .env pls

    const info = await transporter.sendMail({
      from: '"😥 " <abdomohsen20006@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line

      html: emailHtml(token), // html body
    });
    console.log("Message sent: %s", info.messageId);
  });
};

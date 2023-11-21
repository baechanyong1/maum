import * as nodemailer from 'nodemailer';
import { mailConfig } from 'src/config/mail.config'; 

export class MailService {
  static sendErrorMail(subject: string, text: string) {
    const transporter = nodemailer.createTransport(mailConfig);

    const mailOptions = {
      from: mailConfig.from,
      to: mailConfig.to,
      subject,
      text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }
}
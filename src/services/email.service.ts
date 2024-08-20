import * as nodemailer from 'nodemailer';
import { ContactEmailDto } from "src/controllers/DTO/contact.email.dto";

export class EmailService {

    private transporter: any;

    constructor () {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT, 10),
            secure: false,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD,
            },
          });
    }

    async sendContactEmail(contactEmailDto: ContactEmailDto) {

        const { name, firstName, email, subject, message } = contactEmailDto;
        
        try {
            await this.transporter.sendMail({
            from: `"${name} ${firstName}" <${email}>`,
            to: 'contact@sunsetfest.online',
            subject: subject,
            text: message,
          });
          return { message: 'Email sent successfully' };
        } catch (error) {
            throw new Error(`Error while sending the email. Details : ${error.message}`);
        };

      };

}




import nodemailer from 'nodemailer';


// util for sending mail, atm. a mail is sent when a user is created, should be moved from userController to when a contact form i sent
// mail is sent to userEmail, (mailtrap)
export const sendMail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }
        
    })
    console.log(process.env.EMAIL_USER);
    const message = {
        from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(message);
}
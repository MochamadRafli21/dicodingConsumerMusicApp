const nodemailer = require('nodemailer');

class MailSender{
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORDS
            }
        });
    }

    send_email(targetEmail, content){
        const message = {
            from: "Open Music App",
            to: targetEmail,
            subject: "Ekspor Lagu Playlist",
            text: "terlampir lagu dari playlist",
            attachments:[
                {
                    filename: 'songs.json',
                    content,
                }
            ]
        }
        return this.transporter.sendMail(message)
    }

}

module.exports = MailSender;
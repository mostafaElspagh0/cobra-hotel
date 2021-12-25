const nodemailer = require('nodemailer');
const config = require("config");
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.get("gmail").user,
        pass: config.get("gmail").pass,
    }
});


const sendEmail = async (email, message, subject) => {
    return transport.sendMail({
        from: 'cobra hotel',
        to: [email],
        subject: subject,
        text: message,
    })
}

module.exports = sendEmail;
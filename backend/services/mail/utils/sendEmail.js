const nodemailer = require('nodemailer');
const config = require("config");
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.get("gmail").user,
        pass: config.get("gmail").pass,
    }
});


const sendEmail = async (email, message) => {
    await transport.sendMail({
        from: 'cobra hotel',
        to: [email],
        subject: 'forget password',
        text: message,
        html: message
    })
}

module.exports = sendEmail;
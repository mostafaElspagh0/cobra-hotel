const jwt = require("jsonwebtoken");
const config = require("config");
const sendEmail = require("../../mail/utils/sendEmail");

const sendResetPassword = async (email) => {
    jwt.sign(
        {
            email
        },
        config.get('jwtSecret'),
        config.get('jwt_config'),
        (err, token) => {
            if (err) throw err;
            sendEmail(email,
                `<h1>your reset password ling</h1>
                         <h2>${config.get("corsOrigin")}/resetpassword/${token}</h2>`)
        }
    );

}


module.exports = sendResetPassword;
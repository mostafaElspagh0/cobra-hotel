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
            return sendEmail(email,
                `your reset password ling\n
                         ${config.get("corsOrigin")}/resetpassword/${token}`,"forget Password")
        }
    );

}


module.exports = sendResetPassword;
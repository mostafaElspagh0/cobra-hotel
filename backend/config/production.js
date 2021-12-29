module.exports = {
    'database_config': {
        "uri": process.env.MONGODB_URI
    },
    'jwt_config':{ expiresIn: process.env.JWT_EXPIRE_IN, algorithm:  process.env.JWT_ALGORITHM },
    "jwtSecret": process.env.JWT_SECRET,
    "SALT_WORK_FACTOR" : process.env.SALT_WORK_FACTOR*1,
    "corsOrigin": process.env.FRONTEND_ORIGIN,
    "perPage":10,
    "gmail":{
        "user": process.env.GMAIL_USER,
        "pass": process.env.GMAIL_PASS
    },

};
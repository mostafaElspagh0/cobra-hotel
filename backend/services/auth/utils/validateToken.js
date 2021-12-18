const  jwt = require('jsonwebtoken');
const config =require('config');
const validateToken=async (token)=> {
    try {
        const decoded = await jwt.verify(token, config.get('jwtSecret'));
        return decoded;
    }catch (err){
        return null;
    }
};
module.exports=validateToken;

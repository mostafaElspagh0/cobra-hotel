const  jwt = require('jsonwebtoken');
const config =require('config');
const validateToken=async (token)=> {
    try {
        return await jwt.decode(token, config.get('jwtSecret'));
    }catch (err){
        return null;
    }
};
module.exports=validateToken;

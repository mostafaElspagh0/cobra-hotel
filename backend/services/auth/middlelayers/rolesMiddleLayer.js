const jwt = require('jsonwebtoken');
const validateToken = require('../utils/validateToken');
const config = require('config');


const isA = async (req , res , next , job_type) =>{
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({errors :[ { msg : 'No Token , authorization denied'} ]});
    }
    try {
        const decodod = await validateToken(token);
        if(!decodod){
            return res.status(401).json({errors :[ { msg : 'Token is not valid'} ]});
        }
        if (decodod.user.job_type !== job_type){
            return res.status(401).json({errors :[ { msg : 'You are not authorized to perform this action'} ]});
        }
        req.user = decodod.user;
        next();
    } catch (err){
        res.status(401).json({errors :[ { msg : 'Token is not valid'} ]});
    }
};

const isManager = async (req , res , next) => {
    return isA(req , res , next , 'Manager') ;
};

const isHr = async (req , res , next) => {
    return isA(req , res , next , 'Hr') ;
};

const isReceptionist = async (req , res , next) => {
    return isA(req , res , next , 'Receptionist') ;
};

const isBarista = async (req , res , next) => {
    return isA(req , res , next , 'Barista') ;
};


module.exports = {
    isA,
    isManager,
    isHr,
    isReceptionist,
    isBarista,
};

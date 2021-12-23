const validateToken = require('../utils/validateToken');
const isA = (job_types) => {
    return async (req, res, next) => {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(404).json({errors: [{msg: 'NO Token ,authorization denied '}]});
        }
        try {
            const decoded = await validateToken(token);
            if (!decoded) {
                return res.status(401).json({errors: [{msg: 'Invalid Token ,authorization denied '}]});
            }
            if (!job_types.includes(decoded.user.job_type)) {
                return res.status(401).json({errors: [{msg: 'you ara not authorization'}]})
            }
            req.user = decoded.user;
            next();
        } catch (err) {
            res.status(401).json({errors: [{msg: 'Token is not df'}]});
        }
    };

};

module.exports = {
    isA,
};

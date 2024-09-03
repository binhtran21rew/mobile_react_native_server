const {
    checkToken
} = require('../config/JWT')

const isAuth = async (req, res, next) => {
    const _token = req.headers.authorization;
    if(!_token){
        return res.status(400).json('Token is required');
    }
    
    try{
        const authData = await checkToken(_token);
        req.authen = authData;

        next();
    }catch(e){
        return res.status(400).json('Token is required');
    }
}


module.exports = {
    isAuth
}
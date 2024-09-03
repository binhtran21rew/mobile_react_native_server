const jwt = require('jsonwebtoken');

const createToken = (user) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            {data: user}, 
            process.env.JWT_KEY, 
            {
                algorithm: 'HS256',
                expiresIn: process.env.TOKEN_TIME_LIVE
            }, 
            (err, _token) => {
                if(err){
                    return reject(err);
                }
                return resolve(_token);
            }
        )
    })
}

const checkToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token, 
            process.env.JWT_KEY, 
            (err, data) => {
                if(err){
                    return reject(err);
                }

                return resolve(data);
            }
        )
    });
}

module.exports = {
    createToken,
    checkToken
}

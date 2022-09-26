var jwt = require('jsonwebtoken');

function verifyToken(token){
    return new Promise(function(resolve, reject){
        if(token!=undefined){
            jwt.verify(token, process.env.secret_key, function(err, decoded) {
                if(decoded!=undefined){
                    // res.send(decoded)
                    resolve(decoded);
                }
                else{
                    // res.send('Invalid Token!')
                    reject(`Invalid Token!`);
                }
            });
        }
        else{
            // res.send('Invalid Token!');
            reject(`Invalid Token!`);
        }
    })
}

module.exports = verifyToken;
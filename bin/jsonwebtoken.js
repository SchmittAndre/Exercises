/**
 * Created by Andre on 16.07.2017.
 */
var jwt = require('jsonwebtoken');
var secret = '42isnice!TEXTVENTURER';
exports.generateToken = function(userName)
{
    //generate token
    var token = jwt.sign({exp: Math.floor(Date.now() / 1000) + 60*180,
        username: userName
    },secret);
    return token
};

exports.checkToken = function(req, res, next) {

    var token = req.headers.authorization;


    next()
};

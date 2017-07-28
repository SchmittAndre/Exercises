
var jwt = require('jsonwebtoken');
var secret = '42isnice!TEXTVENTURER';
exports.generateToken = function(userName)
{
    //generate token
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + 60 * 180,
        username: userName
    }, secret)
};

exports.checkToken = function(req, res, next) {

    var token = req.headers.authorization;
        res.locals.authentorized = false;
    try {
        var dJwt = jwt.verify(token, secret);
        res.locals.authentorized = true;
        res.locals.token = dJwt;
    }
    catch (e) {
        console.log(e)
    }
    next()
};


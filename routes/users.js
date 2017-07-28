var express = require('express');
var router = express.Router();
var jwt = require('./../bin/jsonwebtoken.js');
userData = require('../ressorces/user.json');

router.put('/login', login);
router.put('/passwordRecovery', recovery);

function login (req,res){
    if (req.body.username !== userData.username || req.body.password !== userData.password) {
        res.status(403).json({
            message: 'wrong Username or password'
        });
        return
    }
    var token = jwt.generateToken(req.body.username);
    res.status(200).json({token: token});
}

function recovery(req, res){
    var body = req.body;
    userData.password = body.password;


    res.status(200).json({
        message: 'Password changed'
    });

}


module.exports = router;

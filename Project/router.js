var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

router.put('/login', login)
router.put('/passwordRecovery', recovery)
router.get('/blog', getBlogLIst)


function login (req,res){
  var userdata = require('./user.json');
  if (req.body.username != userdata.username || req.body.password != userdata.password) {
    res.status(403).json({
      message: 'wrong Username or password'
    });
    return
  }
  var token = jwt.sign({exp: Math.floor(Date.now() / 1000) + 60*180,
                        username: req.body.username
                        },'42isnice!TEXTVENTURER');
  //generate token
  res.status(200).json({token: token})
}

function recovery(req, res){
  var userdata = require('./user.json');
  var body = req.body
  userdata.password = body.password
  

  res.status(200).json({
    message: 'Password changed'
  });
}


function getBlogLIst(req, res){
bloglist= require('./blog.json')
res.json(bloglist)
}

module.exports = router;
var express = require('express');
var router = express.Router();
var jwt = require('./../bin/jsonwebtoken.js');
bloglist= require('../ressorces/blog.json');

/* GET home page. */
router.get('/', getBlogLIst);
router.route('/:id')
        .get(getPost_Id)
        .delete(delPost_Id);

function getBlogLIst(req, res){
    res.json(bloglist);
}

function getPost_Id (req, res) {
    if (bloglist[req.params.id].hidden) {
        res.status(401).json({
            message: 'Forbidden'
        });
        return;
    }
    res.json(bloglist[req.params.id]);
}

function  delPost_Id(req, res) {
    var id = req.params.id;
    delete bloglist[id];
    res.status(200).json({
        message: "Deleted :id"
    })
}


module.exports = router;
//authorization
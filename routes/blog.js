var express = require('express');
var fs = require('fs');
var router = express.Router();
//var jwt = require('./../bin/jsonwebtoken.js');
bloglist= require('../ressorces/blog.json');

/* GET home page. */
router.get('/', getBlogLIst);
router.route('/:id([0-9]+)')
        .get(getPost_Id)
        .delete(delPost_Id)
        .put(putPost_IP);

function getBlogLIst(req, res){
    if (res.locals.authentorized)
    res.status(200).json(bloglist);
    else
    {
        res.status(200).json(bloglist.filter(function(test){
            return test.hidden === false;
        }));
    }

}

function getPost_Id (req, res) {
    if (bloglist[req.params.id].hidden && res.locals.authentorized === false) {
        res.status(401).json({
            message: 'Forbidden'
        });
        return;
    }
    res.json(bloglist[req.params.id]);
}

function  delPost_Id(req, res) {
    var id = req.params.id;
    if (bloglist[id].hidden && res.locals.authentorized === false) {
        res.status(401).json({
            message: 'Forbidden'
        });
        return;
    }
    delete bloglist[id];

    fs.writeFile("./ressorces/blog.json", JSON.stringify(bloglist), function(err) {
        if(err) {
            res.status(500).json({
                message: 'System Error'
            })
        }
        else{
            res.status(200).json({
                message: 'Post Deleted'
            });
        }
    });

    res.status(200).json({
        message: "Deleted :id"
    })
}

function putPost_IP(req, res) {
    var id = req.params.id;
    if (bloglist[id].hidden && res.locals.authentorized === false) {
        res.status(401).json({
            message: 'Forbidden'
        });
        return;
    }
    bloglist[id].title = req.body.title;
    bloglist[id].picture = req.body.picture;
    bloglist[id].author = req.body.author;
    bloglist[id].about = req.body.about;
    bloglist[id].released = req.body.released;
    bloglist[id].hidden = req.body.hidden;
    bloglist[id].tags = req.body.tags;

    fs.writeFile("./ressorces/blog.json", JSON.stringify(bloglist), function(err) {
        if(err) {
            res.status(500).json({
                message: 'System Error'
            })
        }
        else{
            res.status(200).json({
                message: 'Post Deleted'
            });
        }
    });

    res.status(200).json(bloglist[id])

}

module.exports = router;
//authorization
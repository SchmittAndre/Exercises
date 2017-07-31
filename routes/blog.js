var express = require('express');
var fs = require('fs');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
//var jwt = require('./../bin/jsonwebtoken.js');
bloglist= require('../ressorces/blog.json');

/* GET home page. */
router.get('/', getBlogLIst);
router.post('/', createPost);
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
    if (!bloglist[id])
    {
        res.status(500).json({
            message: 'Post not Found'
        });
        return;
    }
    if (bloglist[id].hidden && res.locals.authentorized === false) {
        res.status(401).json({
            message: 'Forbidden'
        });
        return;
    }
    bloglist.splice(id, 1);

    fs.writeFile("./ressorces/blog.json", JSON.stringify(bloglist,null,3), function(err) {
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

    fs.writeFile("./ressorces/blog.json", JSON.stringify(bloglist,null,3), function(err) {
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

function createPost(req, res)   {
    if (res.locals.authentorized === false) {
        res.status(401).json({
            message: 'Forbidden'
        });
        return;
    }

    if (!req.body.title || !req.body.picture || !req.body.author || !req.body.about || !req.body.released || !req.body.hidden || !req.body.tags) {
        res.status(400).send();
        return;
    }

    var newPostIndex = bloglist[bloglist.length-1].index+1;


    var newPost = {
    _id     : new ObjectID(),
    index   : newPostIndex,
    title   : req.body.title,
    picture : req.body.picture,
    author  : req.body.author,
    about   : req.body.about,
    released: req.body.released,
    hidden  : req.body.hidden,
    tags    : req.body.tags
    };

    bloglist.push(newPost);

    fs.writeFile("./ressorces/blog.json", JSON.stringify(bloglist,null,3), function(err) {
        if(err) {
            res.status(500).json({
                message: 'System Error'
            })
        }
        else{
            res.status(201).json({
                message: 'Post Created'
            });
        }
    });


}


module.exports = router;
//authorization
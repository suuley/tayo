const express = require('express');
const router = express.Router();
const { globalVaribles } = require('../config/custonFunction');


let Post = require('../models/post');
// User Model
let User = require('../models/user');
let Article = require('../models/article');
let Comment = require('../models/comment');
const { count } = require('../models/user');

router.use(globalVaribles);




module.exports = {

  // Admin Routes

  getAdmin: function (req, res) {

    res.render('admin/index');
  },

  //Move posts from inspected to pass

  postMovePass: function (req, res) {
    Article.findByIdAndUpdate(req.params.id, { "status": "pass" }, function (err, post) {
      if (err) {
        res.send(err)
      }
      else {
        req.flash('success_msg', ' Badecaddan waa la fasaxay GatePassna waa la siiyey')
        res.redirect('/admin/posts');
      }

    })
  },

  //Move posts from inspected to pass

  postMoveHold: function (req, res) {
    Article.findByIdAndUpdate(req.params.id, { "status": "hold" }, function (err, post) {
      if (err) {
        res.send(err)
      }
      else {
        req.flash('success_msg', ' Badecaddan waa la xannibay Hold ayaana mamulku geliyey')
        res.redirect('/admin/posts');
      }

    })
  },


  // display all posts
  getPosts: function (req, res) {

    Article.find({ status: "inspection" }, function (err, articles) {
      if (err) {

        console.log(err);
      } else {
        console.log(articles.length);

        res.render('admin/posts/index', {
          articles: articles


        });
      }
    }).sort({ _id: -1 });
  },

  // display on hold posts
  getPostsHold: function (req, res) {

    Article.find({ status: "hold" }, function (err, articles) {
      if (err) {

        console.log(err);
      } else {
        console.log(articles.length);

        res.render('admin/posts/hold', {
          articles: articles


        });
      }
    }).sort({ _id: -1 });
  },

  // display gatepass list

  getPass: function (req, res) {

    Article.find({ status: "pass" }, function (err, articles) {

      if (err) {

        console.log(err);
      } else {

        res.render('admin/posts/pass', {
          articles: articles

        });
      }
    }).sort({ _id: -1 });
  },

  //Display hold list

  getPass: function (req, res) {

    Article.find({ status: "pass" }, function (err, articles) {

      if (err) {

        console.log(err);
      } else {

        res.render('admin/posts/pass', {
          articles: articles

        });
      }
    }).sort({ _id: -1 });
  },




  getEditPost: (req, res) => {
    const id = req.params.id;

    Post.findById(id)
      .then(post => {

        res.render('admin/posts/edit_post', { post: post });

      });
  },





  postEditPost: function (req, res, next) {
    let post = {};
    post.title = req.body.title;
    post.author = req.body.author;
    post.body = req.body.body;
    if (req.file) {
      post.articleimage = req.file.originalname;
    } else {
      { post.articleimage === post.articleimage };
    }


    let query = { _id: req.params.id }

    Post.update(query, post, function (err) {
      if (err) {
        console.log(err);
        return;
      } else {
        req.flash('success', 'Post Updated');
        res.render('admin/posts');

      }
    });
  },



  getComment: function (req, res) {
    Comment.find({}, function (err, comments) {

      if (err) {

        console.log(err);
      } else {
        res.render('admin/comments/index', {
          title: 'Qoraalo',
          comments: comments
        });
      }
    }).sort({ _id: -1 });
  },

}
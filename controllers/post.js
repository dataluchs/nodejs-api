const mongoose = require('mongoose');
const Post = require('../models/post');
const User = require('../models/user');

// get all posts
exports.getAllPosts = (req, res, next) => {
  Post.find()
    .populate('author', '_id username')
    .select('title body _id author')
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        posts: docs.map((doc) => {
          return {
            _id: doc._id,
            title: doc.title,
            body: doc.body,
            author: doc.author,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// single post
exports.getSinglePost = (req, res, next) => {
  const id = req.params.postId;
  Post.findById(id)
    .populate('author', '_id username')
    .select('title body _id author created updated')

    .exec()
    .then((data) => {
      if (data) {
        res.status(200).json({
          post: data,
        });
      } else {
        res.status(404).json({
          msg: 'Post not found.',
        });
      }
    });
};

// create new post
exports.createPost = (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    author: req.userId,
  });
  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Created post successfully',
        createdPost: {
          name: result.title,
          body: result.body,
          _id: result._id,
          created: result.created,
          author: req.userId,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// delete post
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);

    // if post does not exist
    if (!post) {
      return res.status(404).json({ message: 'Post 404' });
    }

    // check for isUser
    if (post.author.toString() !== req.userId) {
      return res
        .status(401)
        .json({ message: 'You are not allowed to delete this post.' });
    }
    await post.remove();
    res.json({ message: 'Post was deleted' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post 404' });
    }
    res.status(500).send('Server Error ..');
  }
};

// update post
exports.updatePost = async (req, res, next) => {
  let update = req.body;
  const post = await Post.findById(req.params.postId);
  // check for user
  if (post.author.toString() !== req.userId) {
    return res.status(401).json({
      msg: 'This is not your post ..',
    });
  }
  if (Object.keys(req.body).length === 0) {
    return res.status(401).json({
      msg: 'please insert your data',
    });
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $set: update },
      { new: true }
    );
    res.status(200).json({
      updatedPost,
    });
  } catch (err) {
    return res.status(401).json({
      error: err,
    });
  }
};

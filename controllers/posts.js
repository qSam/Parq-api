const User = require('../models/user');

exports.getAllPosts = function(req,res,next) {
  // Get All Posts
  res.send("Hey There ! I guess you need all posts");
}

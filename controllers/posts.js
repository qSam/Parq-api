const User = require('../models/user');

exports.getAllPosts = function(req,res,next) {
  // Get All Posts
  res.send("Hey There ! I guess you need all posts");
}

exports.updateUserPost = function(req, res, next) {
  const email = req.params.id;
  const post= req.body.post;

  User.findOne({email:email}, function(err,user){
    if (err) { return next(err) }

    if(user){
      user.posts.push({post:post});
      user.save();
      res.send('Following post added' + post);
    } else {
      res.send('User not found');
    }

  });

}

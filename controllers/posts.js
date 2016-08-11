const User = require('../models/user');

exports.getAllUserPosts = function(req,res,next) {
  // Get All Posts
  const email = req.params.id;

  User.findOne({email:email}, function(err,user){
    if (err) { return next(err) }

    if(user) {
      res.send(user.posts);
    } else {
      res.send('User not found');
    }
  });
}

exports.addNewUserPost = function(req, res, next) {
  const email = req.params.id;
  const post= req.body.post;

  User.findOne({email:email}, function(err,user){
    if (err) { return next(err) }

    if(user){
      user.posts.push({post:post});
      user.save();
      res.send('Following post added ' + post);
    } else {
      res.send('User not found');
    }

  });

}


exports.deleteUserPost = function(req,res, next) {
  const email = req.params.id;
  const postId = req.body.postId;




  User.findOne({email:email}, function(err,user){
    if (err)  { return next(err) }

    if(user){
          user.posts.pull({_id:postId});
          user.save();
          res.send('Pilot deleted');
    } else {
        res.send('User not found');
    }
  });

}

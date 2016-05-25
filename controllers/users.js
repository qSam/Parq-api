const User = require('../models/user');

exports.getUser = function(req,res, next) {
  const email = req.params.id;

  User.findOne({email:email},function(err, userFound){

  if(err) { return next(err) }

  if(userFound) {
  res.send(userFound);
  } else {
    res.send('User does not exist');
  }

});
}

exports.getAllUsers = function(req,res, next) {
  User.find(function(err, users){
    if (err) { return next(err) }

    res.send(users);

  });

}

exports.updateUsername = function(req,res,next) {
  const email = req.params.id;
  const  username = req.body.username;

  User.findOne({email:email}, function(err, user){
    if (err) { return next(err) }

    if (user) {
    user.username = username;
    user.save();
    res.send('Username for ' + email + ' updated to ' + username);
  } else {
    res.send('User does not exist');
  }




  });
}

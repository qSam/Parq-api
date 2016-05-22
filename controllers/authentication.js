const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp}, config.secret);
}

exports.signin = function(req,res,next) {
  // User already has signed up
  // Need to provide JWT Token
  res.send({token: tokenForUser(req.user)});
}

exports.signup = function(req,res,next) {
  //Check if a user exists
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }
  //If a user exists return an Error
  User.findOne({email:email},function(err, userFound) {
    if (err) {
      return next(err);
    }

    if(userFound) {
      return res.status(422).send( {error: 'Emain in use'});
    }

      //If new user, create and save user record
      const user = new User({
        email: email,
        password: password,
        username: username
      });

      user.save(function(err){
        if(err) {
          return next(err);
        }

        //Respond to request indicating user creation
        res.json({ token: tokenForUser(user)});

      });


  });

}

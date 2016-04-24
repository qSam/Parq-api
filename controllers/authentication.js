const User = require('../models/user');

exports.signup = function(req,res,next) {
  //Check if a user exists
  const email = req.body.email;
  const password = req.body.password;
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
        password: password
      });

      user.save(function(err){
        if(err) {
          return next(err);
        }

        //Respond to request indicating user creation
        res.json({ success: true});

      });


  });

}

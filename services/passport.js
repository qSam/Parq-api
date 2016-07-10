const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//Create local strategy
const localOptions = {
  usernameField: 'email',
  passwordField: 'password'
};
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
  // Verify username and password, call done with user
  // If incorrect call false;
  User.findOne({email: email}, function(err, user){
    if (err) { return done(err) }

    if(!user) { return done(null, false) }
    console.log('Password in strat : ', password)
    console.log('User is ', user);
    //Compare passwords
    user.comparePassword(password, function(err, isMatch){
      console.log('Is match: ', isMatch);
      if (err) { return done(err); }
      if (!isMatch) { return done(null,false) }

      return done(null, user);
    });


  });

});

// Setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  // See if the user ID in the payload exists in our database
  // If it does, call done with user obect
  // otherwise, call done without a user object
  console.log('APi payload is ', payload);
  User.findById(payload.sub, function(err,user){
    if (err) { return done(err,false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);

const Authentication = require('./controllers/authentication');
const Posts = require('./controllers/posts');
const Users = require('./controllers/users');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session:false});
const requireSignin = passport.authenticate('local', {session: false});


module.exports = function(app) {

  //Index Route
  app.get('/',requireAuth, function(req, res, next){
    res.send({message: 'Parq Home'});
  });


  // Posts routes
  app.get('/getAllPosts', Posts.getAllPosts);

  //User routes
  app.get('/getUser/:email',Users.getUser);
  app.get('/getAllUsers', Users.getAllUsers);

  //Sign in routes
  app.post('/signin', requireSignin,Authentication.signin);
  app.post('/signup', Authentication.signup);


}

const Authentication = require('./controllers/authentication');
const Posts = require('./controllers/posts');
const Users = require('./controllers/users');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session:false});
const requireSignin = passport.authenticate('local', {session:false});


module.exports = function(app) {

  //Index Route
  app.get('/',requireAuth, function(req, res, next){
    res.send({message: 'Parq Home'});
  });


  // Posts routes
  app.get('/getAllUserPosts/:id', requireAuth, Posts.getAllUserPosts);
  app.put('/addNewUserPost/:id', requireAuth, Posts.addNewUserPost);
  app.delete('/deleteUserPost/:id', requireAuth, Posts.deleteUserPost);

  //User routes
  app.get('/getUser/:id', requireAuth, Users.getUser);
  app.get('/getAllUsers', requireAuth, Users.getAllUsers);
  app.put('/updateUsername/:id', requireAuth, Users.updateUsername);

  //Sign in routes
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);


}

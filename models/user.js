const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define the model
const postsSchema = new Schema({
  post:String
});


const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  username: String,
  posts:[postsSchema]
});

//On save hook, encrypt password
userSchema.pre('save', function(next){
   // Get access to the user model
   const user = this;

   //Only Hash the password if it has been modified or it is new
   if (!user.isModified('password')) {
     console.log('Password not modified');
     return next();
   }

   // Generate a salt
   bcrypt.genSalt(10, function(err,salt){
     if (err) { return next(err) }
     //Hash(encrypt) the password using salt
     bcrypt.hash(user.password, salt, null, function(err, hash){
       if (err) { return next(err) }
       //Override with encrypted password
       user.password = hash;
       next();
     });


   });
});

userSchema.methods.comparePassword = function(candidate, callback) {

  bcrypt.compare(candidate, this.password, function(err, isMatch){
    if (err) { return callback(err)}
    callback(null, isMatch);
  });
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

//Export the model
module.exports = ModelClass;

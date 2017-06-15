const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const User = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    firstName: { type: String },
    lastName: { type: String }
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
},
{
  timestamps: true
});

User.pre('save', function(next){
  const user = this,
  SALT_FACTOR = 5;
  if(user.isModified('password')){
    console.log('MODIFIED PASSWORD BITCH');
    bcrypt.genSalt(SALT_FACTOR,function(err,salt){
      if(err){
        return next(err);
      }else{
        bcrypt.hash(user.password, salt, null, function(err, hash){
          if(err) return next(err);
          user.password = hash;
          next();
        });
      }
    });
  }else{
    return next;
  }
});
// check a user password  against the hashed password to see if it's correct.
User.methods.comparePassword = function(candidatePassword, cb){
  bcrypt.compare(candidatePassword, this.password, function(err, match){
    if(err) {return cb(err);}
    cb(null,match);
  });
};

module.exports = mongoose.model('User', User);

const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
SALT_WORK_FACTOR = 256;
const Schema = mongoose.Schema;
const UserSchema = new Schema ({
    image:{type:String},
    email:{type:String,index:true},
    username:{type:String,unique:true},
    password:{type:String},
    date: { type: Date, default: Date.now }
});
/*
UserSchema.pre('save', function(next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};
*/
const User = mongoose.model('User', UserSchema);
module.exports = User;
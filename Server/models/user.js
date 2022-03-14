const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const config = require('../config')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide a valid email address'],
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email address'],
    },
    displayName: {
        type: String,
        match: [/^([a-zA-Z0-9_\- ]){3,30}$/, 'Please provide a valid display name (only use letters, numbers, "-" and "_", max length of 30, min length of 3)'],
    },

    profilePicture: {
        type: String
    },

    password: {
        type: String,
        match: [/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Please provide a password with at least one upper case letter, one lower case letter, one digit, one special character and a minimum length of eight'],
        required: true
    },

    creationDate: {
        type: Date
    },
})

// https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
// https://stackoverflow.com/questions/16882938/how-to-check-if-that-data-already-exist-in-the-database-during-update-mongoose

UserSchema.pre('save', function(next) {
    const user = this;

    User.find({email : user.email}, function (err, docs) {
        if (docs.length){
            console.log('Email is already taken: ', user.email);
            next(new Error("Email is already taken!"));
        }
    });

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // set the creation date
    user.creationDate = Date.now()

    // generate a salt
    bcrypt.genSalt(config.crypto.salt, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.methods.strip = function() {
    let stripped = ({...this}._doc);
    delete stripped.password
    return stripped
};

const User = mongoose.model('User', UserSchema)

module.exports = exports = User

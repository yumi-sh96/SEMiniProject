var mongoose = require('mongoose');
//var passportLocal= require('passport-local');
//var passportLocalMongoose = require('passport-local-mongoose');
var bcrypt   = require('bcrypt-nodejs');


var studentSchema = mongoose.Schema({

        username: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        hasPortofolio: {
            type: Number,
            default: 0
        }


    }



)

studentSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
studentSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


var Student = mongoose.model("student", studentSchema);

module.exports = Student;
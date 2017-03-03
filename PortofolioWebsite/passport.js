
var LocalStrategy   = require('passport-local').Strategy;


var Student            = require('./app/models/Student');


module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });


    passport.deserializeUser(function(id, done) {
        Student.findById(id, function(err, user) {
            done(err, user);
        });
    });



    passport.use('local-signup', new LocalStrategy({

            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {
            //
            process.nextTick(function() {


                Student.findOne({ 'username' :  username }, function(err, student) {

                    if (err)
                        return done(err);

                    if (student) {
                        return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                    } else {


                        var newStudent  = new Student();

                        // set the user's local credentials
                        newStudent.username    = username;
                        newStudent.password = newStudent.generateHash(password);

                        // save the user
                        newStudent.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newStudent);
                        });
                    }

                });

            });

        }));


    passport.use('local-login', new LocalStrategy({

            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {

            Student.findOne({ 'username' :  username }, function(err, student) {

                if (err)
                    return done(err);

                if (!student)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                if (student.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                return done(null, student);
            });

        }));




}
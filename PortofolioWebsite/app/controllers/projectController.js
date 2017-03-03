
var Student = require('../models/Student');
var Client  = require('../models/Client');
var Portofolio= require('../models/Portofolio');

var projectController = {

    getIndex: function(req, res){
            Portofolio.find(function(err, portofolios){

                if(err)
                    res.send(err.message);
                else{

                    console.log(portofolios.length);
                        res.render('index', {"portofolios": portofolios});

                }


            })



    },

    getLoginPage: function(req,res){

        res.render('login.ejs', { message: req.flash('loginMessage') });

    },

    getRegisterPage: function(req, res){
        res.render('register.ejs', { message: req.flash('signupMessage') });

    },




    registerClient: function(req,res){

        var client= new Client(req.body);

        client.save(function(err, client){
            if(err){
                res.send(err.message);
                console.log(err);
            }
            else{
                console.log(client);

                req.session.user=client;

                res.redirect('/portofolio_summary');              // res.redirect('/');

            }
        })
    },



    loginClient: function(req, res){

        var username= req.body.username;
        var password = req.body.password;

        Client.findOne({username: username, password: password}, function(err, client){

            if (err){
                console.log("error");
                res.send("Wrong username or password");
            }

            if(!client)
                res.send("Wrong username or password");

            else{

                req.session.user=client;

                passport.authenticate('local')(req, res, function () {
                    res.redirect('/client_home');
                });


                }
        })
    },

    resetPassword: function(req, res){



    },

    updateProfilePicture:function (req, res){
        var image= req.params.pic;
        Student.findOne({username: req.session.username}),function(err,student){
            if (err){
                console.log(err);
                return res.status(500).send();

            }else {
                student.profilePicture= req.body.image;
            }



        }



    },



    createPortofolio:function(req, res){
        console.log("PO");
        console.log(req.files);
        var portofolio = new Portofolio();
        portofolio.studentName= req.body.studentName;
        portofolio.projectURL=  req.files.path;
        portofolio.studentUsername= req.user.username;

        portofolio.save(function (err, portofolio) {
            if(err){
                req.flash('mess','Somthing went wrong. Try Again');
                return res.render('studenthome', {"message": req.flash('mess') });
            }
            else {
                req.flash('mess','Portofolio Created!');
                Student.findOne({"username": req.user.username}, function(err,student){
                    if (err){
                        console.log(err);
                        return res.status(500).send();

                    }else {
                        student.hasPortofolio= 1;
                        student.save();
                        console.log(student.hasPortofolio);
                    }

                return res.redirect('student_home');

            })



        }


    })},



    getStudentHome: function(req,res) {

    Student.findOne({"username": req.user.username},function(err,student){
        if (err){
            console.log(err);
            return res.status(500).send();

        }else {
            console.log(student.hasPortofolio);
            if (student.hasPortofolio===1){
                Portofolio.findOne({"studentUsername": req.user.username}, function(err, portofolio){
                    if (err){
                        return res.status(500).send();
                    }

                    else return res.render('student_home', {"message":portofolio});
                })
            }

            else {
                var message= "You don't have a portofolio. Create One?";
                req.flash('mess','You do not have a portofolio');
                return res.render('student_home', {"message": 'mess'});
            }

            }

        })},



    addProject:function(req, res){

        var temp=req.body.URL;

        Portofolio.findOne({"studentUsername": req.user.username}, function(err, portofolio){
            if (err){
                return res.status(500).send();
            }

            else {

                portofolio.projectsURL.push(temp);
                return res.render('student_home', {"message":portofolio});
            }
        })

    },

    deleteProject: function (req, res){

    },

    search: function(req, res){

    },

    logout: function(req, res){
        req.logout();
        res.redirect('/');
    }


};

module.exports = projectController;
// require dependincies
var express = require('express');
var router = express.Router();
var passport = require('passport');
var multer  = require('multer')
var upload = multer({ dest: './uploads' });

var projectController = require('./controllers/projectController');
console.log("In Router");
router.get('/', projectController.getIndex);
//router.get('/portofolio_summary', projectController.getAllPortofolios);

router.get('/register',projectController.getRegisterPage);
router.get('/login',projectController.getLoginPage);

//router.post('/forgot_password', projectController.resetPassword);

router.post('/register_as_student', passport.authenticate('local-signup', {
    successRedirect : '/student_home', failureRedirect : '/register', failureFlash : true}));

router.post('/register_as_client', projectController.registerClient);

router.post('/login_as_student',passport.authenticate('local-login',{successRedirect: '/student_home',
    failureRedirect: '/login', failureFlash: true }));

router.post('/login_as_client',projectController.loginClient);

router.post('/create_portofolio', upload.any(),projectController.createPortofolio);

//router.post('/update_pic', projectController.updateProfilePicture);

router.post('/add_project', projectController.addProject);
//router.post('/delete_project', projectController.deleteProject);

router.get('/student_home', isLoggedIn, projectController.getStudentHome);
//router.get('/search', projectController.search);

router.get('logout', projectController.logout);

function isLoggedIn(req, res, next) {
   if (req.isAuthenticated())
        return next();
    res.redirect('/');
}


// export router

module.exports = router;
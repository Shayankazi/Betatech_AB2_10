const { signupValidation, loginValidation } = require('../middlewares/AuthMiddleware');
const {signup, login,forgotPassword,resetPassword } = require('../controllers/AuthController');
const {googleLogin} = require('../controllers/GoogleAuthController');
const router = require('express').Router();



router.post('/login',loginValidation, login);
router.post('/signup',signupValidation, signup);
router.get('/google',googleLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
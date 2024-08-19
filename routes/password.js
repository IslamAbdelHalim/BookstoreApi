const express = require('express');
const router = express.Router();
const {getForgetPasswordView, sentForgetPasswordLink, getRestPasswordView, RestPassword} = require('../controllers/passwordController');

// show the forget password page
router.get('/forget-password', getForgetPasswordView);
router.post('/forget-password', sentForgetPasswordLink);

//show the rest password view
router.get('/rest-password/:userId/:token', getRestPasswordView)
router.post('/rest-password/:userId/:token', RestPassword)


module.exports = router;
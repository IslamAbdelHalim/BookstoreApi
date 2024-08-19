const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { verifyTokenAndAdmin, verifyTokenAndAuth} = require('../middlewares/verifyToken');

router
    .route('/')
    .get(verifyTokenAndAdmin, getAllUsers);

router
    .route('/:id')
    .get(verifyTokenAndAuth, getUserById)
    .put(verifyTokenAndAuth, updateUser)
    .delete(verifyTokenAndAuth, deleteUser);


module.exports = router

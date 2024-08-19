const express = require('express');
const router = express.Router();
const { getAllBooks, getBookById, updateBook, createBook, deleteBook } = require('../controllers/bookController');
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');


router
    .route('/')
    .get(getAllBooks)
    .post(verifyTokenAndAdmin, createBook);

router
    .route('/:id')
    .get(getBookById)
    .put(verifyTokenAndAdmin, updateBook)
    .delete(verifyTokenAndAdmin, deleteBook);


module.exports = router;
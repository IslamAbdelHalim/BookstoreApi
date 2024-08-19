const express = require('express');
const router = express.Router()
const {getAllAuthors, getAuthorById, deleteAuthor, createNewAuthor, updateAuthor} = require('../controllers/authorController');
const { route } = require('./books');

router
    .route('/')
    .get(getAllAuthors)
    .post(createNewAuthor);

router
    .route('/:id')
    .get(getAuthorById)
    .put(updateAuthor)
    .delete(deleteAuthor);

module.exports = router;
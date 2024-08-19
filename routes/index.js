const express = require('express');
const router = express.Router();
const routerBooks = require('./books');
const routerAuthor = require('./authors');
const routerAuth = require('./auth');
const routerUser = require('./user');


//route books
router.use('/books', routerBooks)

//route Author
router.use('/authors', routerAuthor)

//route Auth
router.use('/auth', routerAuth)

//route user
router.use('/auth/user', routerUser)


module.exports = router;
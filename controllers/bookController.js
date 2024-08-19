const {Book, validateUpdate, ValidatePost} = require('../models/Book')

/**
 * @desc request to get all books
 * @route /api/book
 * @method GET
 * @access public
 */
const getAllBooks = async (req, res) => {
    try {
        const {pageNumber} = req.query;
        const bookPerPage = 2;
        const books = await Book.find()
            .populate("author", ["-_id", "firstName", "lastName"])
            .select('-_id')
            .skip((pageNumber - 1) * bookPerPage).limit(bookPerPage);
        res.status(200).json(books);
    } catch(err) {
        console.log(err);
        res.status(500).json({message: 'Server Error....'});
    }
}

/**
 * @desc request to get book by id
 * @route /api/book
 * @method GET
 * @access public
 */
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("author", ["_id", "firstName", "lastName"]);
        if(book){
            res.status(200).json(book);
        } else {
            res.status(404).json({message: "Book not Fount"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'server Error'});
    }
}

/**
 * @desc request to post book to database
 * @route /api/book
 * @method POST
 * @access public
 */
const createBook = async (req, res) => {
    const { error } = ValidatePost(req.body);

    if (error) return res.status(400).json({message: error.details[0].message});

    try {
        const newBook = new Book(req.body);
        const book = await newBook.save();
        res.status(201).json(book);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'server Error'});
    }
}

/**
 * @desc request to delete book by name
 * @route /api/book
 * @method DELETE
 * @access public
 */
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(book) {
            await Book.findByIdAndDelete(req.params.id)
            res.status(200).json({message: 'Delete successful'});
        } else {
            res.status(404).json({message: 'Not find Book'});
        }
    } catch(error) {
        res.status(500).json({message: 'server Error'});
    }
}

/**
 * @desc request to update book
 * @route /api/book
 * @method PUT
 * @access public
 */
const updateBook = async (req, res) => {
    const { error } = validateUpdate(req.body);
    if (error) return res.status(400).json({message: error.details[0].message});

    try {
        const book = await Book.findById(req.params.id);
        if(book) {
            const newBook = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true});
            res.status(200).json(newBook);
        } else {
            res.status(404).json({message: 'Not find Book'});
        }
    } catch(error) {
        res.status(500).json({message: 'server Error'});
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    deleteBook,
    updateBook
}
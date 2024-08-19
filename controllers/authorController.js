const {Author, validateNewAuthor, validateUpdateAuthor} = require('../models/Author');

/**
 * @des get all authors
 * @route /api/authors
 * @method GET
 * @access public
 */
const getAllAuthors = async (req, res)=> {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server Error....'})
  }
  
}

/**
 * @des get author by id
 * @route /api/authors
 * @method GET
 * @access public
 */
const getAuthorById = async (req, res)=> {
  try {
    const author = await Author.findById(req.params.id);
    if(author)
    {
      res.status(200).json(author);
    } else {
      res.status(404).json({message: "author not found"});
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server Error....'})
  }
}

/**
 * @des post a new Author
 * @route /api/authors
 * @method POST
 * @access public
 */
const createNewAuthor = async (req, res)=> {
  // validate data
  const {error} = validateNewAuthor(req.body);

  if (error)
    res.status(400).json({message: error.details[0].message});

  try {
    const author = new Author(req.body);
    const result = await author.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server Error.....'});
  }
}

/**
 * @des update a new Author
 * @route /api/authors
 * @method PUT
 * @access public
 */
const updateAuthor = async (req, res)=> {
  // validate data
  const {error} = validateUpdateAuthor(req.body);
  if(error)
    return res.status(400).json({message: error.details[0].message})

  try {
    const author = await Author.findByIdAndUpdate(req.params.id, {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image
      }
    }, {new: true});

    if(!author)
      res.status(404).json({message: 'Author is not defines'})
    else
      res.status(201).json(author);

  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'server Error....'})
  }
}

/**
 * @des delete a new Author
 * @route /api/authors
 * @method delete
 * @access public
 */
const deleteAuthor =  async (req, res)=> {
  try {
    const author = await Author.findById(req.params.id);
    if (author) {
      await Author.findByIdAndDelete(req.params.id);
      res.status(200).json({message: 'Author has been deleted'});
    } else {
      res.status(404).json({message: 'Author Not Found'});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "server Error..."})
  }
}

module.exports = {
  getAllAuthors,
  getAuthorById,
  createNewAuthor,
  updateAuthor,
  deleteAuthor
}
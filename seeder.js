const connectDB = require('./config/db');
const {Book} = require('./models/Book');
const {Author} = require('./models/Author');
const {books, authors} = require('./data');
require('dotenv').config();

connectDB();

//Import Books
const importBooks = async () => {
    try{
        await Book.insertMany(books);
        console.log('imported successfully.');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const importAuthors = async () => {
    try {
        await Author.insertMany(authors);
        console.log('imported successfully.');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const removeBooks = async () => {
    try {
        await Book.deleteMany();
        console.log('delete successfully.');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const removeAuthors = async () => {
    try {
        await Author.deleteMany();
        console.log('delete successfully.');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

if(process.argv[2] === 'add-books') {
    importBooks();
} else if (process.argv[2] === 'remove-books') {
    removeBooks();
} else if (process.argv[2] === 'add-authors') {
    importAuthors();
} else if (process.argv[2] === 'remove-authors') {
    removeAuthors();
}
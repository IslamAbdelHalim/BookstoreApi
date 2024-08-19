const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const routes = require('./routes/index');
const connectDB = require('./config/db');
require('dotenv').config();
const { errorHandler, notFoundError} = require('./middlewares/error');
// connect to Database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'images')));

// using helmet
app.use(helmet());

// using cors 
app.use(cors());

// set the view engine 
app.set('view engine', 'ejs');

app.use('/api', routes);

// view the forget password
app.use('/password', require('./routes/password'));

//upload images
app.use('/upload', require('./routes/upload'));

// //Error handleMiddleware
app.use(notFoundError);
app.use(errorHandler);

PORT = process.env.PORT
app.listen(PORT, 'localhost', console.log('The app work in port 5000'));
const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
  // detect the destination where the images will be saves
  destination: function(req, file, callB){
    callB(null, path.join(__dirname, '../images'))
  },
  // make the file name 
  filename: function(req, file, callB){
    callB(null, new Date().toISOString() + file.originalname);
  }
});

const uploadImage = multer({ storage });
// this uploadImage is a middleware we use it in the method

router.post('/', uploadImage.single('image'), (req, res) => {
  res.status(200).json({message: "Image uploaded"});
})

module.exports = router;
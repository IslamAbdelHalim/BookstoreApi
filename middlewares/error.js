const notFoundError = (req, res, next) => {
  const error = new Error(`Not Found This route ${req.originalUrl}`);
  res.status(404);
  next(error);
}

const errorHandler = (err, req, res, next) => {
  const code = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(code).json({message: err.message});
}

module.exports = {
  notFoundError,
  errorHandler
}
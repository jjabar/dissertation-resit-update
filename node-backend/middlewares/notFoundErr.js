import ErrorHandler from "../utils/ErrorHandler.js";

//404 handler
const notFound = (req, res, next) => {
  const err = new ErrorHandler(`Route ${req.originalUrl} not found`, 404);
  next(err);
};

export default notFound;

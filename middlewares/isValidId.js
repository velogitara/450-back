const { isValidObjectId } = require('mongoose');
const { HttpError } = require('../helpers');
const isValidId = (req, res, next) => {
  const { orderId: id } = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(404, `${id} is not a valid id`));
  }
  next();
};

module.exports = isValidId;

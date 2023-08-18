const moment = require('moment-timezone');
const { HttpError } = require('../../helpers');
const { Order } = require('../../models');

const TIMEZONE = 'Europe/Kiev';

const addPersonToOrder = async (req, res) => {
  const { orderId: id } = req.params;
  const newPersonData = req.body;

  const existingOrder = await Order.findById(id);
  if (!existingOrder) {
    throw HttpError(404, 'Order not found');
  }
  const isDuplicate = existingOrder.persons.some(
    person => person.email === newPersonData.email || person.phone === newPersonData.phone
  );

  if (isDuplicate) {
    throw HttpError(400, 'Duplicate email or phone in order');
  }

  const currentTime = moment().tz(TIMEZONE); // Get time on 3 hour early

  const updatedOrder = await Order.updateOne(
    { _id: id },
    { $push: { persons: newPersonData }, $set: { changedDate: currentTime } }
  );
  if (updatedOrder.nModified === 0) {
    throw HttpError(404, 'Order not found');
  }

  return res.status(201).json({ message: 'Person added to order successfully' });
};

module.exports = addPersonToOrder;

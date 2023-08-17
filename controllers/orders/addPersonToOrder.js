const { Order } = require('../../models');

const addPersonToOrder = async (req, res) => {
  const orderId = req.params.orderId;
  const newPersonData = req.body;
  console.log(orderId);

  //   const order = await Order.findById(orderId);
  //   if (!order) {
  //     return res.status(404).json({ error: 'Order not found' });
  //   }

  //   order.persons.push(newPersonData);
  //   await order.save();

  //   return res.status(201).json(order);
  try {
    console.log(orderId);

    const updatedOrder = await Order.updateOne(
      { _id: orderId },
      { $push: { persons: newPersonData } }
    );

    if (updatedOrder.nModified === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    return res.status(201).json({ message: 'Person added to order successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Could not add person to order' });
  }
};

module.exports = addPersonToOrder;

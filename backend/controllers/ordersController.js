const uuid = require("uuid");
const Order = require("../model/Order");

const getAllOrders = async (req, res) => {
  const orders = await Order.find({ username: req.user }).exec();
  if (!orders) return res.status(204).json({ message: "No orders found on this account." });
  res.json(orders);
};

const createNewOrder = async (req, res) => {
  if (!req?.body?.items || req.body.items.length === 0) {
    return res.status(400).json({ message: "Order items are required." });
  }

  try {
    const result = await Order.create({
      _id: uuid.v4(),
      username: req.user,
      items: req.body.items,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const deleteOrder = async (req, res) => {
  try {
    if (!req?.body?.id) {
      return res.status(400).json({ message: "ID parameter is required." });
    }

    const order = await Order.findOne({ _id: req.body.id }).exec();
    if (!order) {
      return res
        .status(404)
        .json({ message: `No order matches ID ${req.body.id}` });
    }

    await order.deleteOne();
    res
      .status(201)
      .json({ message: `Order with ID ${req.body.id} deleted successfully.` });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).json({ message: "Server error while deleting order." });
  }
};

module.exports = {
  getAllOrders,
  createNewOrder,
  deleteOrder,
};

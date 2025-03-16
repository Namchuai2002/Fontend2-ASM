import Order from "../models/Order.js";

// Lấy danh sách đơn hàng
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").populate("products.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server khi lấy danh sách đơn hàng!" });
  }
};

// Lấy chi tiết đơn hàng theo ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email").populate("products.product");
    if (!order) return res.status(404).json({ message: "Không tìm thấy đơn hàng!" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server khi lấy đơn hàng!" });
  }
};

// Tạo đơn hàng mới
export const createOrder = async (req, res) => {
  try {
    const { user, products, totalPrice, status } = req.body;
    const newOrder = new Order({ user, products, totalPrice, status });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: "Tạo đơn hàng thất bại!" });
  }
};

// Cập nhật trạng thái đơn hàng
export const updateOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!updatedOrder) return res.status(404).json({ message: "Không tìm thấy đơn hàng!" });

    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: "Cập nhật đơn hàng thất bại!" });
  }
};

// Xóa đơn hàng
export const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: "Không tìm thấy đơn hàng!" });
    res.json({ message: "Đơn hàng đã bị xóa!" });
  } catch (error) {
    res.status(500).json({ message: "Xóa đơn hàng thất bại!" });
  }
};

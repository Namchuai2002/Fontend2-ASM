import { Button, Card, Table, Tag, message, Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/orders");
        setOrders(data);
      } catch (error) {
        message.error("Không thể tải danh sách đơn hàng!");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

 
  const handleUpdateStatus = async (orderId: number, currentStatus: string, newStatus: string) => {
    if (currentStatus === "Đã hủy") {
      message.warning("Không thể thay đổi trạng thái của đơn hàng đã hủy!");
      return;
    }

    try {
      await axios.patch(`http://localhost:3000/orders/${orderId}`, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      message.success(`Cập nhật trạng thái thành "${newStatus}" thành công!`);
    } catch (error) {
      message.error("Lỗi khi cập nhật trạng thái đơn hàng!");
    }
  };

  const columns = [
    { title: "Mã đơn hàng", dataIndex: "id", key: "id" },
    {
      title: "Họ và tên",
      dataIndex: "customer",
      key: "name",
      render: (customer: any) => customer?.name || "Không có dữ liệu",
    },
    {
      title: "Số điện thoại",
      dataIndex: "customer",
      key: "phone",
      render: (customer: any) => customer?.phone || "Không có dữ liệu",
    },
    {
      title: "Địa chỉ",
      dataIndex: "customer",
      key: "address",
      render: (customer: any) => customer?.address || "Không có dữ liệu",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (total: number) => `${total.toLocaleString("vi-VN")} VND`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any) => {
        let color =
          status === "Chờ xác nhận" ? "orange" :
          status === "Đã xác nhận" ? "blue" :
          status === "Đã giao hàng" ? "green" :
          "red";

        return (
          <Select
            value={status}
            onChange={(newStatus) => handleUpdateStatus(record.id, status, newStatus)}
            style={{ width: 150 }}
            disabled={status === "Đã hủy"} 
          >
            <Select.Option value="Chờ xác nhận">🟠 Chờ xác nhận</Select.Option>
            <Select.Option value="Đã xác nhận">🔵 Đã xác nhận</Select.Option>
            <Select.Option value="Đã giao hàng">🟢 Đã giao hàng</Select.Option>
            <Select.Option value="Đã hủy">🔴 Đã hủy</Select.Option>
          </Select>
        );
      },
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Quản lý đơn hàng</h1>
      <Card>
        <Table columns={columns} dataSource={orders} loading={loading} rowKey="id" />
      </Card>
    </div>
  );
};

export default AdminOrders;

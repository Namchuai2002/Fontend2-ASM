

import { Button, Card, Table, Tag, message } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const user = localStorage.getItem("user");

      if (!user) {
        message.error("Bạn cần đăng nhập để xem lịch sử đơn hàng!");
        navigate("/auth/dang-nhap");
        setLoading(false);
        return;
      }

      try {
        const userId = JSON.parse(user).id;
        const { data } = await axios.get(`http://localhost:3000/orders?userId=${userId}`);

        if (data.length === 0) {
          message.info("Bạn chưa có đơn hàng nào!");
        }

        setOrders(data);
      } catch (error) {
        message.error("Không thể tải danh sách đơn hàng!");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const handleCancelOrder = async (orderId: number) => {
    try {
      await axios.patch(`http://localhost:3000/orders/${orderId}`, { status: "Đã hủy" });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "Đã hủy" } : order
        )
      );
      message.success("Đơn hàng đã bị hủy!");
    } catch (error) {
      message.error("Lỗi khi hủy đơn hàng!");
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
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (paymentMethod: string) => {
        let color = "default";
        let icon = "";

        switch (paymentMethod) {
          case "VNPAY":
            color = "blue";
            icon = "";
            break;
          case "ZALOPAY":
            color = "green";
            icon = "";
            break;
          case "COD":
            color = "orange";
            icon = "";
            break;
          default:
            color = "default";
            icon = "❓";
        }

        return <Tag color={color}>{icon} {paymentMethod}</Tag>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = status === "Chờ xác nhận" ? "orange" : status === "Đã xác nhận" ? "green" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: any, record: any) =>
        record.status === "Chờ xác nhận" ? (
          <Button danger onClick={() => handleCancelOrder(record.id)}>
            Hủy đơn
          </Button>
        ) : (
          <Tag color="default">Không thể hủy</Tag>
        ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lịch sử đơn hàng</h1>
      <Card>
        <Table columns={columns} dataSource={orders} loading={loading} rowKey="id" />
      </Card>
    </div>
  );
};

export default OrdersPage;
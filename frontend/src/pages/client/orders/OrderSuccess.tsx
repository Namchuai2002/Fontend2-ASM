import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Result, message } from "antd";

const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      message.info("Đang chuyển hướng đến lịch sử đơn hàng...");
      navigate("/orders");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Result
        status="success"
        title="🎉 Đặt hàng thành công!"
        subTitle="Đơn hàng của bạn đã được ghi nhận. Chúng tôi sẽ sớm liên hệ để xác nhận giao hàng."
        extra={[
          <Button type="primary" onClick={() => navigate("/")}>🏠 Về trang chủ</Button>,
          <Button onClick={() => navigate("/orders")}>📦 Xem đơn hàng</Button>,
        ]}
      />
    </div>
  );
};

export default OrderSuccess;

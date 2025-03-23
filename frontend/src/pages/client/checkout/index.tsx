import React, { useState } from "react";
import { Button, InputNumber, Select, message, Card, Typography, Spin } from "antd";
import axios from "axios";
import { CreditCardOutlined, BankOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Title, Text } = Typography;

const CheckoutPage: React.FC = () => {
  const [amount, setAmount] = useState<number>(10000);
  const [bankCode, setBankCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handlePayment = async () => {
    if (!amount || amount < 10000) {
      message.error("Số tiền phải lớn hơn 10,000 VND");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/create_payment_url",
        {
          params: { amount: Math.round(amount), bankCode },
        }
      );
      window.location.href = response.data.paymentUrl;
    } catch (error) {
      console.log(error);
      message.error("Lỗi khi tạo thanh toán");
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Card
        hoverable
        style={{
          width: 400,
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <Title level={3} style={{ color: "#1890ff" }}>
          <CreditCardOutlined style={{ marginRight: 8 }} />
          Thanh toán VNPAY
        </Title>

        <Text strong style={{ fontSize: "16px", display: "block", marginBottom: 10 }}>
          Nhập số tiền:
        </Text>
        <InputNumber
          min={10000}
          value={amount}
          onChange={(value) => setAmount(value || 10000)}
          style={{ width: "100%", marginBottom: 16 }}
          addonAfter="VND"
        />

        <Text strong style={{ fontSize: "16px", display: "block", marginBottom: 10 }}>
          Chọn ngân hàng (Tùy chọn):
        </Text>
        <Select
          placeholder="Chọn ngân hàng"
          onChange={setBankCode}
          style={{ width: "100%", marginBottom: 16 }}
          allowClear
        >
          <Option value="VCB">
            <BankOutlined style={{ marginRight: 8 }} /> Vietcombank
          </Option>
          <Option value="BIDV">
            <BankOutlined style={{ marginRight: 8 }} /> BIDV
          </Option>
          <Option value="VIB">
            <BankOutlined style={{ marginRight: 8 }} /> VIB
          </Option>
        </Select>

        <Button type="primary" size="large" block loading={loading} onClick={handlePayment}>
          {loading ? <Spin /> : "Thanh toán ngay"}
        </Button>
      </Card>
    </div>
  );
};

export default CheckoutPage;

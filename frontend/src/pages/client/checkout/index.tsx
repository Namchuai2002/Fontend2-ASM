import React, { useState } from "react";
import { Button, InputNumber, Select, message } from "antd";
import axios from "axios";

const { Option } = Select;

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
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <h2>Thanh toán VNPAY</h2>
      <InputNumber
        min={10000}
        value={amount}
        onChange={(value) => setAmount(value || 10000)}
        style={{ width: "100%", marginBottom: 16 }}
        addonAfter="VND"
      />
      <Select
        placeholder="Chọn ngân hàng (Tùy chọn)"
        onChange={setBankCode}
        style={{ width: "100%", marginBottom: 16 }}
        allowClear
      >
        <Option value="VCB">Vietcombank</Option>
        <Option value="BIDV">BIDV</Option>
        <Option value="VIB">VIB</Option>
      </Select>
      <Button type="primary" loading={loading} onClick={handlePayment}>
        Thanh toán
      </Button>
    </div>
  );
};

export default CheckoutPage;

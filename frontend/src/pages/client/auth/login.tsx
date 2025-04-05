import { Button, Form, Input, message, notification, Typography } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const { email, password } = await form.validateFields();
      const { data } = await axios.get(`http://localhost:3000/users?email=${email}`);

      if (data.length === 0) return message.error("Email không tồn tại!");
      if (data[0].password !== password) return message.error("Sai mật khẩu!");

      localStorage.setItem("token", "fake-jwt-token");
      localStorage.setItem("user", JSON.stringify(data[0]));

      notification.success({ message: "Đăng nhập thành công" });
      navigate("/"); 
      window.location.reload();
    } catch {
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: "20px" }}>
      <Typography.Title level={2} style={{ textAlign: "center", color: "#1890ff" }}>
       ĐĂNG NHẬP
      </Typography.Title>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, min: 6 }]}>
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Đăng nhập
        </Button>
      </Form>
    </div>
  );
}

export default Login;

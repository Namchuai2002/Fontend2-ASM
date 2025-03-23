import { Button, Form, Input, message, Typography } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const { email, password } = await form.validateFields();
      
      // Kiểm tra xem email đã tồn tại chưa
      const { data: users } = await axios.get(`http://localhost:3000/users?email=${email}`);
      if (users.length > 0) return message.error("Email đã tồn tại!");

      // Nếu email chưa tồn tại, tiến hành đăng ký
      await axios.post("http://localhost:3000/users", { email, password });

      message.success("Đăng ký thành công!");
      navigate("/auth/login"); // Chuyển hướng về trang đăng nhập
    } catch {
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: "20px" }}>
      <Typography.Title level={2} style={{ textAlign: "center", color: "#ff6f61" }}>
       ĐĂNG KÝ
      </Typography.Title>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, min: 6 }]}>
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Đăng ký
        </Button>
      </Form>
    </div>
  );
}

export default Register;

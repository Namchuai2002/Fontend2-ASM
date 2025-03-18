import { Button, Form, Input, message, notification } from "antd";
import axios, { AxiosError } from "axios";

function Login() {
  const [form] = Form.useForm();
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const { data } = await axios.post("/login", values);
      localStorage.setItem("token", data.accessToken);
      notification.success({ message: "Login ok" });
    } catch (error) {
      message.error("Login failed: " + (error as AxiosError).message);
    }
  };
  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, type: "email" }]}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, min: 6 }]}
      >
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Login;

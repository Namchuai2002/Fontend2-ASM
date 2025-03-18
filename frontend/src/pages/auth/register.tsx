import { Button, Form, Input, message } from "antd";
import axios, { AxiosError } from "axios";

function Register() {
  const [form] = Form.useForm();
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await axios.post("http://localhost:3000/users", values);
      message.success("Register ok");
    } catch (error) {
      message.error("Register failed: " + (error as AxiosError).message);
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

export default Register;

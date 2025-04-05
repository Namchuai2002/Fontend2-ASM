import { Button, Card, Form, Input, message, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

// 🔹 Định nghĩa kiểu dữ liệu cho user
interface User {
  id: number;
  email: string;
  password: string;
  status: "Hoạt động" | "Bị dừng";
  lastLogin: string;
}

const UserProfile = () => {
  const userId = 1; 
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data }: { data: User } = await axios.get(`http://localhost:3000/users/${userId}`);

        const lastLogin = dayjs(data.lastLogin);
        const now = dayjs();
        const diffDays = now.diff(lastLogin, "day");

        let newStatus: "Hoạt động" | "Bị dừng" = data.status;
        if (diffDays > 90) newStatus = "Bị dừng";

        if (newStatus !== data.status) {
          await axios.patch(`http://localhost:3000/users/${userId}`, { status: newStatus });
          data.status = newStatus;
        }

        setUser(data);
        form.setFieldsValue({ password: "" });
      } catch (error) {
        message.error("Không thể tải thông tin người dùng!");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [form]);

  const handleUpdatePassword = async (values: { password: string }) => {
    if (!user) return;

    try {
      await axios.patch(`http://localhost:3000/users/${user.id}`, { password: values.password });
      message.success("Cập nhật mật khẩu thành công!");
      form.resetFields();
    } catch (error) {
      message.error("Lỗi khi cập nhật mật khẩu!");
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    try {
      await axios.delete(`http://localhost:3000/users/${user.id}`);
      message.success("Tài khoản đã bị xóa!");
      setUser(null);
    } catch (error) {
      message.error("Lỗi khi xóa tài khoản!");
    }
  };

  if (loading) return <p>Đang tải...</p>;
  if (!user) return <p>Tài khoản không tồn tại hoặc đã bị xóa.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Quản lý tài khoản</h1>

      {user.status === "Bị dừng" && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          🔴 Tài khoản của bạn đã bị dừng do không đăng nhập quá 90 ngày. Hãy liên hệ quản trị viên để kích hoạt lại.
        </p>
      )}

      <Card>
        <Form form={form} layout="vertical" onFinish={handleUpdatePassword}>
          <Form.Item
            label="Mật khẩu mới"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" disabled={user.status === "Bị dừng"}>
            Cập nhật mật khẩu
          </Button>
        </Form>

        <Popconfirm
          title="Bạn có chắc chắn muốn xóa tài khoản không?"
          onConfirm={handleDeleteAccount}
          okText="Xóa"
          cancelText="Hủy"
        >
          <Button type="primary" danger style={{ marginTop: 16 }}>
            Xóa tài khoản
          </Button>
        </Popconfirm>
      </Card>
    </div>
  );
};

export default UserProfile;

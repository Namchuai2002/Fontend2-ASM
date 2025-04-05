import { Button, Card, Table, message, Popconfirm, Tag } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/users");

    
        const updatedUsers = data.map((user: any) => {
          const lastLogin = dayjs(user.lastLogin);
          const now = dayjs();
          const diffDays = now.diff(lastLogin, "day");

          if (diffDays > 90 && user.status !== "Bị dừng") {
            return { ...user, status: "Bị dừng" };
          } else if (diffDays <= 90 && user.status === "Bị dừng") {
            return { ...user, status: "Hoạt động" };
          }
          return user;
        });

      
        for (const user of updatedUsers) {
          await axios.patch(`http://localhost:3000/users/${user.id}`, { status: user.status });
        }

        setUsers(updatedUsers);
      } catch (error) {
        message.error("Không thể tải danh sách người dùng!");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Email", dataIndex: "email", key: "email" },
    { 
      title: "Vai trò", 
      dataIndex: "role", 
      key: "role", 
      render: (role: string) => (
        <Tag color={role === "admin" ? "red" : "blue"}>{role}</Tag>
      ),
    },
    { 
      title: "Trạng thái", 
      dataIndex: "status", 
      key: "status", 
      render: (status: string) => (
        <Tag color={status === "Bị dừng" ? "red" : "green"}>{status}</Tag>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: any) => (
        <>
          {record.role !== "admin" && (
            <>
              <Button
                type="primary"
                onClick={() => navigate(`/admin/users/${record.id}/edit`)}
                style={{ marginRight: 8 }}
                disabled={record.status === "Bị dừng"}
              >
                Sửa
              </Button>
              <Popconfirm
                title="Bạn có chắc chắn muốn xóa?"
                onConfirm={async () => {
                  if (record.role === "admin") {
                    message.warning("Không thể xóa tài khoản admin!");
                    return;
                  }
                  await axios.delete(`http://localhost:3000/users/${record.id}`);
                  setUsers((prevUsers) => prevUsers.filter((user) => user.id !== record.id));
                  message.success("Xóa người dùng thành công!");
                }}
                okText="Xóa"
                cancelText="Hủy"
              >
                <Button type="primary" danger disabled={record.status === "Bị dừng"}>
                  Xóa
                </Button>
              </Popconfirm>
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Quản lý người dùng</h1>
      <Card>
        <Table columns={columns} dataSource={users} loading={loading} rowKey="id" />
      </Card>
    </div>
  );
};

export default AdminUsers;

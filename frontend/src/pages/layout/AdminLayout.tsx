import { UserOutlined, HomeOutlined, ShopOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Layout, Menu } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const nav = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: "/admin", icon: <HomeOutlined />, label: "Dashboard" },
    { key: "/admin/product/list", icon: <ShopOutlined />, label: "Products" },
    { key: "/admin/category/list", icon: <AppstoreAddOutlined />, label: "Categories" },  // Thêm mục danh mục
    { key: "/admin/users", icon: <UserOutlined />, label: "Users" },
    { key: "/auth/register", icon: <UserOutlined />, label: "Register" },
    { key: "/auth/login", icon: <UserOutlined />, label: "Login" },
  ];

  const selectedKey = location.pathname;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={250} style={{ background: "#001529" }}>
        <div
          style={{
            height: "64px",
            color: "white",
            textAlign: "center",
            lineHeight: "64px",
            fontSize: "18px",
            background: "#001529",
          }}
        >
          Admin Panel
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => nav(key)}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 20px",
            fontSize: "20px",
            borderBottom: "1px solid #ddd",
          }}
        >
          Admin Dashboard
        </Header>
        <Content
          style={{
            margin: "20px",
            padding: "20px",
            background: "#fff",
            borderRadius: "8px",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;

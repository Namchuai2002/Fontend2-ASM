import { Content, Footer, Header } from "antd/es/layout/layout";
import { Button, Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";

const ClientLayout = () => {
  return (
    <Layout>
      {/* Header */}
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">Trang chủ</Menu.Item>
          <Menu.Item key="2">Sản phẩm</Menu.Item>
          <Menu.Item key="3">Liên hệ</Menu.Item>
          <Menu.Item key="3">
            <Link to={"/checkout"}>Checkout</Link>
          </Menu.Item>
        </Menu>
      </Header>

      {/* Banner */}
      <div
        style={{
          textAlign: "center",
          padding: "50px 0",
          background: "#f0f2f5",
        }}
      >
        <h1>Chào mừng đến với cửa hàng!</h1>
        <p>Khám phá những sản phẩm chất lượng cao với giá hấp dẫn.</p>
        <Button type="primary" size="large">
          Mua ngay
        </Button>
      </div>

      {/* Danh sách sản phẩm */}
      <Content style={{ padding: "20px 50px" }}>
        <Outlet />
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: "center" }}>
        ©2025 Cửa hàng của bạn. All Rights Reserved.
      </Footer>
    </Layout>
  );
};

export default ClientLayout;

import React, { useEffect, useState } from "react";
import { Input, Layout, Menu, Button, Dropdown, Row, Col, Carousel, Card, Typography, Image } from "antd";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

const { Header, Content, Footer } = Layout;

type Category = { id: number; name: string };
type Product = { id: number; name: string; image: string; price: number; category: number };

type Banner = { id: number; image: string };

type User = { email: string };

const ClientLayout = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannersRes, categoriesRes, productsRes] = await Promise.all([
          axios.get("http://localhost:3000/banners"),
          axios.get("http://localhost:3000/categories"),
          axios.get("http://localhost:3000/products"),
        ]);
        setBanners(bannersRes.data);
        setCategories(categoriesRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleSearch = () => {
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  return (
    <Layout>
      <Header style={{ background: "#FFB6C1", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Menu theme="dark" mode="horizontal" style={{ flex: 1, background: "#FFB6C1" }}>
  <Menu.Item key="home">
    <Link to="/" style={{ color: "white" }}>Trang chủ</Link>
  </Menu.Item>
  <Menu.Item key="products">
    <Link to="/san-pham" style={{ color: "white" }}>Sản phẩm</Link>
  </Menu.Item>
  <Menu.Item key="contact">
    <Link to="/lien-he" style={{ color: "white" }}>Liên hệ</Link>
  </Menu.Item>
  <Menu.Item key="cart">
    <Link to="/gio-hang" style={{ color: "white" }}>Giỏ hàng</Link>
  </Menu.Item>
  <Menu.Item key="checkout">
    <Link to="/checkout" style={{ color: "white" }}>Checkout</Link>
  </Menu.Item>

  <Dropdown overlay={
    <Menu>
      {categories.map(cat => (
        <Menu.Item key={cat.id}>
          <Link to={`/category/${cat.name.toLowerCase().replace(/\s+/g, '-')}`}>{cat.name}</Link>
        </Menu.Item>
      ))}
    </Menu>
  } trigger={["hover"]}>
    <Menu.Item style={{ color: "white" }}>Danh mục</Menu.Item>
  </Dropdown>
</Menu>

        <Input.Search
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearch={handleSearch}
          style={{ width: 250, marginRight: 20 }}
          enterButton={<SearchOutlined />}
        />
        {user ? (
          <Dropdown overlay={<Menu>
            <Menu.Item>Tài khoản của tôi</Menu.Item>
            <Menu.Item onClick={handleLogout}>Đăng xuất</Menu.Item>
          </Menu>}>
            <Button type="text" style={{ color: "white" }}>Xin chào: {user.email.split("@")[0]} ▼</Button>
          </Dropdown>
        ) : (
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to="auth/login"><Button>Đăng nhập</Button></Link>
            <Link to="auth/register"><Button type="primary">Đăng ký</Button></Link>
          </div>
        )}
      </Header>

      {location.pathname === "/" && (
        <>
          <Carousel autoplay autoplaySpeed={1500} dots={false}>
            {banners.map(banner => (
              <div key={banner.id}><img src={banner.image} alt={`Banner ${banner.id}`} style={{ width: "100%", height: "400px", objectFit: "cover" }} /></div>
            ))}
          </Carousel>

          <Content style={{ padding: "20px 50px" }}>
            {categories.map(category => (
              <div key={category.id} style={{ marginBottom: "40px" }}>
                <Typography.Title level={3} style={{ color: "#ff6f61" }}>{category.name}</Typography.Title>
                <Row gutter={[16, 16]}>
                  {products.filter(p => p.category === category.id).map(p => (
                    <Col span={6} key={p.id}>
                      <Card hoverable cover={<Image alt={p.name} src={p.image} />} title={p.name}>
                        <p>{p.price} VND</p>
                        <Link to={`/product/${p.id}`}><Button type="primary">Xem chi tiết</Button></Link>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </Content>
        </>
      )}

      <Content style={{ padding: "20px 50px" }}>{location.pathname !== "/" && <Outlet />}</Content>

      <Footer style={{ background: "rgba(0, 0, 0, 0.6)", padding: "20px", textAlign: "center", color: "white" }}>
        <Row justify="center">
          <Col xs={24} sm={12} md={8}>
            <h3 style={{ color: "#ff6f61" }}>Nhóm 8</h3>
            <p>📍 <strong>Địa chỉ:</strong> Q. Hà Đông, TP. Hà Nội</p>
            <p>📞 <strong>Số điện thoại:</strong> 0338051556</p>
            <p>📧 <strong>Email:</strong> namntph48452@fpt.edu.vn</p>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
};

export default ClientLayout;

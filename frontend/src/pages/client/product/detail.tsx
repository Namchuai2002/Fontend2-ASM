import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, InputNumber, message, Spin, Typography, Modal } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const { Title, Text } = Typography;

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  desc: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Kiểm tra login
  const navigate = useNavigate(); // Để điều hướng đến trang đăng nhập nếu chưa đăng nhập

  // Kiểm tra người dùng có đăng nhập hay không
  useEffect(() => {
    const token = localStorage.getItem("token"); // Hoặc sessionStorage nếu bạn dùng session
    setIsLoggedIn(!!token); // Nếu có token thì người dùng đã đăng nhập
  }, []);

  // Lấy chi tiết sản phẩm
  async function getProductDetail(id: string) {
    try {
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);
      if (!data) {
        message.error("Sản phẩm không tồn tại!");
        return;
      }
      setProduct(data);
    } catch (error) {
      message.error("Lỗi khi tải chi tiết sản phẩm!");
    } finally {
      setLoading(false);
    }
  }

  // Lấy lại chi tiết sản phẩm mỗi khi `id` thay đổi
  useEffect(() => {
    if (id) {
      setLoading(true);
      getProductDetail(id);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      Modal.confirm({
        title: "Bạn chưa đăng nhập",
        content: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.",
        okText: "Đăng nhập",
        cancelText: "Hủy",
        onOk: () => navigate("/auth/login"), // Chuyển hướng đến trang đăng nhập
      });
      return;
    }

    message.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const productInCart = cart.find((item: Product) => item.id === product?.id);

    if (productInCart) {
      productInCart.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "50px auto" }} />;
  }

  if (!product) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Sản phẩm không tồn tại!</h2>;
  }

  return (
    <Row justify="center" style={{ marginTop: "50px" }}>
      <Col xs={24} sm={16} md={12} lg={10}>
        <Card
          hoverable
          style={{
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
          cover={
            <img
              alt={product.name}
              src={product.image}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          }
        >
          <Title level={3} style={{ color: "#1890ff" }}>
            {product.name}
          </Title>
          <Text strong style={{ fontSize: "20px", color: "#ff4d4f" }}>
            {product.price.toLocaleString("vi-VN")} VND
          </Text>
          <p style={{ marginTop: "10px", color: "#595959" }}>{product.desc}</p>

          {isLoggedIn ? (
            <Row justify="center" align="middle" gutter={16} style={{ marginTop: "20px" }}>
              <Col>
                <InputNumber
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={(value) => setQuantity(value || 1)}
                  style={{ width: "80px" }}
                />
              </Col>
              <Col>
                <Button type="primary" size="large" onClick={handleAddToCart}>
                  Thêm vào giỏ hàng
                </Button>
              </Col>
            </Row>
          ) : (
            <p style={{ marginTop: "20px", color: "#ff4d4f" }}>
              Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!
            </p>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default ProductDetail;

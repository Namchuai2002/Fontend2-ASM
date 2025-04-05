import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, InputNumber, message, Typography, Empty } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Title, Text } = Typography;

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

const CartPage: React.FC = () => {
    const [cart, setCart] = useState<Product[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(storedCart);

        axios.get("http://localhost:3000/products")
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const total = cart.reduce((sum, item) => {
            const product = products.find((p) => p.id === item.id);
            return product ? sum + product.price * item.quantity : sum;
        }, 0);
        setTotalPrice(total);
    }, [cart, products]);

    const handleQuantityChange = (id: number, value: number) => {
        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, quantity: value } : item
        );
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleRemoveFromCart = (id: number) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        message.success("Sản phẩm đã được xóa khỏi giỏ hàng");
    };

    const handleCheckout = () => {
        navigate("/thanh-toan");
    };

    if (cart.length === 0 && !loading) {
        return (
            <Row justify="center" style={{ marginTop: "50px" }}>
                <Col xs={24} sm={18} md={12} lg={8}>
                    <Empty description="Giỏ hàng của bạn trống" />
                    <Button type="primary" onClick={() => navigate("/")}>
                        Mua sắm ngay
                    </Button>
                </Col>
            </Row>
        );
    }

    return (
        <div style={{ padding: "20px" }}>
            <Title level={2}>Giỏ hàng</Title>
            <Row gutter={[16, 16]}>
                {cart.map((item) => {
                    const product = products.find((p) => p.id === item.id);
                    return product ? (
                        <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                hoverable
                                style={{ textAlign: "center", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
                                cover={<img alt={product.name} src={product.image} />}
                            >
                                <Title level={4}>{product.name}</Title>
                                <Text strong style={{ fontSize: "18px", color: "#ff4d4f" }}>
                                    {product.price.toLocaleString("vi-VN")} VND
                                </Text>
                                <div style={{ marginTop: "10px" }}>
                                    <InputNumber min={1} value={item.quantity} onChange={(value) => handleQuantityChange(item.id, value || 1)} style={{ width: "80px" }} />
                                </div>
                                <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleRemoveFromCart(item.id)} style={{ marginTop: "10px" }}>
                                    Xóa
                                </Button>
                            </Card>
                        </Col>
                    ) : null;
                })}
            </Row>

            <Row justify="end" style={{ marginTop: "30px" }}>
                <Col>
                    <Title level={3}>Tổng cộng: {totalPrice.toLocaleString("vi-VN")} VND</Title>
                </Col>
            </Row>

            <Row justify="center" style={{ marginTop: "20px" }}>
                <Col>
                    <Button type="primary" size="large" onClick={handleCheckout}>
                        Tiến hành thanh toán
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default CartPage;
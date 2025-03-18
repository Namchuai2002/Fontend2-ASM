import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, InputNumber, message } from "antd";
import { useParams } from "react-router-dom";
import { Product } from "../../product/list";
import axios from "axios";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [quantity, setQuantity] = useState(1);

  const [product, setProduct] = useState<Product>();

  async function getProductDetail(id: string) {
    const { data } = await axios.get(`/products/${id}`);
    setProduct(data);
  }
  useEffect(() => {
    if (!id) return;
    getProductDetail(id);
  }, [id]);

  const handleAddToCart = () => {
    message.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
  };

  if (!product) {
    return "Not Found";
  }
  return (
    <Row gutter={[16, 16]} justify="center">
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card cover={<img alt={product.name} src={product.image} />}>
          <h2>{product.name}</h2>
          {/* <p>{product.description}</p> */}
          <h3>{product.price}</h3>
          <Row gutter={16} align="middle">
            <Col>
              <InputNumber
                min={1}
                max={10}
                value={quantity}
                onChange={(value) => setQuantity(value || 1)}
              />
            </Col>
            <Col>
              <Button type="primary" onClick={handleAddToCart}>
                Thêm vào giỏ hàng
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductDetail;

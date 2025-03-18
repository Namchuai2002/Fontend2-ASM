import { Button, Form, FormProps, Input, message } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editProductDetail,
  getProductDetail,
  ProductForm,
} from "../../services/product";
import { useMutation, useQuery } from "@tanstack/react-query";
function ProductEdit() {
  const { id } = useParams();

  const [form] = Form.useForm();
  const nav = useNavigate();

  const { data: product } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetail(id),
    enabled: !!id,
  });
  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    }
  }, [product, form]);

  const { mutate: handleEdit } = useMutation({
    mutationFn: editProductDetail,
  });

  const onFinish: FormProps<ProductForm>["onFinish"] = (values) => {
    if (!id) return;
    handleEdit(
      { id, values },
      {
        onSuccess: () => {
          message.success("Cập nhật sản phẩm thành công!");
          nav("/admin/product/list");
        },
        onError: () => {
          message.error("Lỗi khi cập nhật sản phẩm!");
        },
      }
    );
  };
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: "Please enter price" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item name="image" label="Image" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
}

export default ProductEdit;

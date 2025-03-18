import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { getAllProduct, removeProduct } from "../../services/product";

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

function ProductList() {
  const nav = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProduct,
  });

  const { mutate: deleteProduct } = useMutation({
    mutationFn: removeProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleDelete = (id: number) => {
    deleteProduct(id, {
      onSuccess: () => {
        message.success("Xóa sản phẩm thành công!");
      },
      onError: () => {
        message.error("Lỗi khi xóa sản phẩm!");
      },
    });
  };

  if (error) return <p>Lỗi khi tải sản phẩm</p>;

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Actions",
      render: (record: Product) => {
        return (
          <>
            <Button
              onClick={() => nav(`/admin/product/${record.id}/edit`)}
              type="link"
            >
              Edit
            </Button>
            <Button onClick={() => handleDelete(record.id)} type="link" danger>
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => nav("/admin/product/add")}
      >
        Add Bubble Tea
      </Button>
      <Table
        columns={columns}
        dataSource={products}
        loading={isLoading}
        rowKey="id"
      />
    </div>
  );
}

export default ProductList;

import axiosInstance from "../config/axios";

export type ProductForm = {
  title: string;
  image: string;
  price: number;
  // description
  // category
};

export const getAllProduct = async () => {
  const { data } = await axiosInstance.get("/products");
  return data;
};

export const getProductDetail = async (id?: string) => {
  if (!id) return;
  const { data } = await axiosInstance.get("/products/" + id);
  return data;
};

export const removeProduct = async (id: number) => {
  if (confirm("Xoa")) {
    await axiosInstance.delete("/products/" + id);
  }
};

export const addProduct = (data: ProductForm) => {
  return axiosInstance.post("/products", data);
};

export const editProductDetail = ({
  id,
  values,
}: {
  id: string;
  values: ProductForm;
}) => {
  return axiosInstance.put("/products/" + id, values);
};

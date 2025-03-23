import axiosInstance from "../config/axios";

export type CategoryForm = {
  name: string;
};

export const getAllCategories = async () => {
  const { data } = await axiosInstance.get("/categories");
  return data;
};

export const getCategoryDetail = async (id?: string) => {
  if (!id) return;
  const { data } = await axiosInstance.get(`/categories/${id}`);
  return data;
};

export const removeCategory = async (id: number) => {
  await axiosInstance.delete(`/categories/${id}`);
};

export const addCategory = (data: CategoryForm) => {
  return axiosInstance.post("/categories", data);
};

export const editCategoryDetail = ({
  id,
  values,
}: {
  id: string;
  values: CategoryForm;
}) => {
  return axiosInstance.put(`/categories/${id}`, values);
};

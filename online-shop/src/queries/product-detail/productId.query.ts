import api from "../../config/axios/axiosConfig";

export const getProductById = async (id: string) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

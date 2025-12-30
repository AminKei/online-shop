import api from "../../config/axios/axiosConfig";
import type { Product } from "../../types/products";

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await api.get("/products");
  return data;
};

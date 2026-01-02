import { useQuery } from "@tanstack/react-query";
import api from "../../config/axios/axiosConfig";

export const useProductById = (id?: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}`);
      return data;
    },
    enabled: !!id, // ⭐ خیلی مهم
  });
};

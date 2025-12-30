import { useQuery } from "@tanstack/react-query";
import api from "../../config/axios/axiosConfig";

export const useUserOrders = (enabled: boolean) => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await api.get("/user/orders");
      return res.data;
    },
    enabled,
  });
};

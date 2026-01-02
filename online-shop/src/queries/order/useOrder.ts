import { useQuery } from "@tanstack/react-query";
import api from "../../config/axios/axiosConfig";
import { getUserOrders } from "./order.api";

export const useOrder = () => {
  const { data: [] } = useQuery({
    queryKey: ["orders"],
    queryFn: () => api.get("/user/orders").then((res) => res.data),
  });
};



export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getUserOrders,
  });
};

import { useQuery } from "@tanstack/react-query";
import api from "../../config/axios/axiosConfig";

export const useOrder = () => {
  const { data: [] } = useQuery({
    queryKey: ["orders"],
    queryFn: () => api.get("/user/orders").then((res) => res.data),
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../config/axios/axiosConfig";
import { message } from "antd";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => api.post("/cart", { productId }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      message.success("به سبد خرید اضافه شد");
    },
    onError: () => {
      message.error("ابتدا وارد حساب کاربری خود شوید");
    },
  });
};

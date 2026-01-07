import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../config/axios/axiosConfig";
import { message } from "antd";

export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: number;
      quantity: number;
    }) => api.put(`/cart/${productId}`, { quantity }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      message.error("خطا در بروزرسانی تعداد");
    },
  });
};

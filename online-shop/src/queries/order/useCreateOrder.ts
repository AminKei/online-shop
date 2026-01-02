import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { createOrder, type CreateOrderPayload } from "./order.api";
import { useNavigate } from "react-router-dom";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => createOrder(payload),

    onSuccess: () => {
      message.success("سفارش با موفقیت ثبت شد 🎉");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      navigate("/");
    },

    onError: () => {
      message.error("ثبت سفارش ناموفق بود");
    },
  });
};

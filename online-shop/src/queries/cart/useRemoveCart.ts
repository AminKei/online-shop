import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../config/axios/axiosConfig";
import { showMessage } from "../../components/ui/Message/AppMessage";

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => api.delete(`/cart/${productId}`),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      showMessage("success", "محصول حذف شد");
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { addToWishlist, removeFromWishlist } from "./wishlistApi";

export const useToggleWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      isCurrentlyInWishlist,
    }: {
      productId: number;
      isCurrentlyInWishlist: boolean;
    }) => {
      if (isCurrentlyInWishlist) {
        await removeFromWishlist(productId);
      } else {
        await addToWishlist(productId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["wishlist", "check"] });
    },
    onError: () => {
      message.error("خطایی رخ داد. دوباره تلاش کنید.");
    },
  });
};

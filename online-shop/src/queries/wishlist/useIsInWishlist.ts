import { useQuery } from "@tanstack/react-query";
import { checkIsInWishlist } from "./wishlistApi";

export const useIsInWishlist = (productId?: number) => {
  return useQuery({
    queryKey: ["wishlist", "check", productId],
    queryFn: () => checkIsInWishlist(productId!),
    enabled: !!productId && !!localStorage.getItem("token"),
  });
};

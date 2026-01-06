import { useQuery } from "@tanstack/react-query";
import { fetchWishlist } from "./wishlistApi";

export const useWishlist = () => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishlist,
    enabled: !!localStorage.getItem("token"),
  });
};

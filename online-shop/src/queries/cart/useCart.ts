import { useQuery } from "@tanstack/react-query";
import { getCart } from "./cart.query";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    staleTime: 1000 * 60 * 5, // 5 دقیقه
  });
};



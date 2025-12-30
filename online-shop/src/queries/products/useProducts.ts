import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./products.query";
import type { Product } from "../../types/products";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5, // 5 دقیقه
  });
};

import { useQuery } from "@tanstack/react-query";
import api from "../../config/axios/axiosConfig";

const productKeys = {
  all: ["products"] as const,
  search: (query: string) => ["products", "search", query] as const,
};

export const useSearchProducts = (searchQuery: string) => {
  return useQuery({
    queryKey: productKeys.search(searchQuery),
    queryFn: async () => {
      const res = await api.get("/products");
      return res.data.filter((p: any) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    },
    enabled: searchQuery.trim().length >= 1,
  });
};

// src/queries/wishlist/useWishlist.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

// تابع برای گرفتن هدر با توکن تازه
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const useWishlist = () => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/wishlist`, getAuthHeaders());
      return data;
    },
    enabled: !!localStorage.getItem("token"),
  });
};

export const useIsInWishlist = (productId?: number) => {
  return useQuery({
    queryKey: ["wishlist", "check", productId],
    queryFn: async () => {
      if (!productId) return false;
      const { data } = await axios.get(
        `${API_BASE}/wishlist/check/${productId}`,
        getAuthHeaders()
      );
      return data.isInWishlist;
    },
    enabled: !!productId && !!localStorage.getItem("token"),
  });
};

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
        await axios.delete(`${API_BASE}/wishlist/${productId}`, getAuthHeaders());
      } else {
        await axios.post(`${API_BASE}/wishlist`, { productId }, getAuthHeaders());
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
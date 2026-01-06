import api from "../../config/axios/axiosConfig";

export const fetchWishlist = () => api.get("/wishlist").then((res) => res.data);

export const checkIsInWishlist = (productId: number) =>
  api.get(`/wishlist/check/${productId}`).then((res) => res.data.isInWishlist);

export const addToWishlist = (productId: number) =>
  api.post("/wishlist", { productId });

export const removeFromWishlist = (productId: number) =>
  api.delete(`/wishlist/${productId}`);

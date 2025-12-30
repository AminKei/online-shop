import api from "../../config/axios/axiosConfig";

export const getCart = async () => {
  const { data } = await api.get("/cart");
  return data;
};

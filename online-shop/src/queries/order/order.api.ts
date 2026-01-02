import api from "../../config/axios/axiosConfig";

export type CreateOrderPayload = {
  address: {
    province: string;
    city: string;
    street: string;
    plaque: string;
    postalCode: string;
  };
  shippingType: "standard" | "express";
};

export const createOrder = async (payload: CreateOrderPayload) => {
  const { data } = await api.post("/orders", payload);
  return data;
};



export const getUserOrders = async () => {
  const { data } = await api.get("/user/orders");
  return data;
};

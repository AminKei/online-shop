import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import api from "../../config/axios/axiosConfig";

type LoginPayload = {
  email: string;
  password: string;
};

export const useLogin = (onSuccessNavigate?: () => void) => {
  return useMutation({
    mutationFn: (values: LoginPayload) => api.post("/auth/login", values),

    onSuccess: (response) => {
      const { token } = response.data;

      localStorage.setItem("token", token);
      message.success("ورود موفقیت‌آمیز بود 👋");

      onSuccessNavigate?.();
    },

    onError: (error: any) => {
      const msg =
        error.response?.data?.message || "ایمیل یا رمز عبور اشتباه است";
      message.error(msg);
    },
  });
};

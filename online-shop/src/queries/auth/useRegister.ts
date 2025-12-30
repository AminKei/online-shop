import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import api from "../../config/axios/axiosConfig";

type RegisterPayload = {
  name?: string;
  email: string;
  password: string;
};

export const useRegister = (onSuccessNavigate?: () => void) => {
  return useMutation({
    mutationFn: (values: RegisterPayload) => api.post("/auth/register", values),

    onSuccess: (response) => {
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      message.success(`ثبت‌نام با موفقیت انجام شد  خوش آمدید ${user.name}`);

      onSuccessNavigate?.();
    },

    onError: (error: any) => {
      const msg = error.response?.data?.message || "خطایی در ثبت‌نام رخ داد";
      message.error(msg);
    },
  });
};

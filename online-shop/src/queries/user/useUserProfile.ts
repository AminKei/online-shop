import { useQuery } from "@tanstack/react-query";
import api from "../../config/axios/axiosConfig";

export const useUserProfile = (enabled: boolean) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await api.get("/user/profile");
      return res.data;
    },
    enabled,
  });
};

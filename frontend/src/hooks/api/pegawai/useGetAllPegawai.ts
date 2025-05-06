import { useMutation } from "@tanstack/react-query";

import { axiosService } from "@/utils/axiosService";

export const useGetAllPegawai = () => {
  return useMutation({
    mutationKey: ["getAllPegawai"],
    mutationFn: async () => {
      const response = await axiosService().get("api/pegawai");
      return response.data;
    },
  });
};

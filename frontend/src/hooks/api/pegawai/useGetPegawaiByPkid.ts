import { useMutation } from "@tanstack/react-query";

import { axiosService } from "@/utils/axiosService";

export const useGetPegawaiByPkid = (pkid: number) => {
  return useMutation({
    mutationKey: ["getPegawaiByPkid"],
    mutationFn: async () => {
      const response = await axiosService().get(`api/pegawai/${pkid}`);
      return response.data;
    },
  });
};

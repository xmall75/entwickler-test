import { useQuery } from '@tanstack/react-query';

import { axiosService } from '@/utils/axiosService';

export const useGetPegawaiByPkid = (pkid: number) => {
  return useQuery({
    queryKey: ['getPegawaiByPkid'],
    queryFn: async () => {
      const response = await axiosService().get(`api/pegawai/${pkid}`);
      return response.data;
    },
  });
};

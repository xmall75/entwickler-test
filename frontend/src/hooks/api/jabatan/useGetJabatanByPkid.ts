import { useQuery } from '@tanstack/react-query';

import { axiosService } from '@/utils/axiosService';

export const useGetJabatanByPkid = (pkid: number) => {
  return useQuery({
    queryKey: ['getJabatanByPkid'],
    queryFn: async () => {
      const response = await axiosService().get(`api/jabatan/${pkid}`);
      return response.data;
    },
  });
};

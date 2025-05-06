import { useQuery } from '@tanstack/react-query';

import { axiosService } from '@/utils/axiosService';

export const useGetUnitKerjaByPkid = (pkid: number) => {
  return useQuery({
    queryKey: ['getUnitKerjaByPkid'],
    queryFn: async () => {
      const response = await axiosService().get(`api/unit-kerja/${pkid}`);
      return response.data;
    },
  });
};

import { useMutation } from '@tanstack/react-query';

import { axiosService } from '@/utils/axiosService';

export const useGetUnitKerjaByPkid = (pkid: number) => {
  return useMutation({
    mutationKey: ['getUnitKerjaByPkid'],
    mutationFn: async () => {
      const response = await axiosService().get(`api/unit-kerja/${pkid}`);
      return response.data;
    },
  });
};

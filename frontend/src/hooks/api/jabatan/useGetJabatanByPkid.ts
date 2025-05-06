import { useMutation } from '@tanstack/react-query';

import { axiosService } from '@/utils/axiosService';

export const useGetJabatanByPkid = (pkid: number) => {
  return useMutation({
    mutationKey: ['getJabatanByPkid'],
    mutationFn: async () => {
      const response = await axiosService().get(`api/jabatan/${pkid}`);
      return response.data;
    },
  });
};

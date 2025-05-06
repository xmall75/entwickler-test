import { useMutation } from '@tanstack/react-query';

import { axiosService } from '@/utils/axiosService';

export const useGetAllUnitKerja = () => {
  return useMutation({
    mutationKey: ['getAllUnitKerja'],
    mutationFn: async () => {
      const response = await axiosService().get('api/unit-kerja');
      return response.data;
    },
  });
};

import { useMutation } from '@tanstack/react-query';

import { axiosService } from '@/utils/axiosService';

export const useGetAllJabatan = () => {
  return useMutation({
    mutationKey: ['getAllJabatan'],
    mutationFn: async () => {
      const response = await axiosService().get('api/jabatan');
      return response.data;
    },
  });
};

import { useMutation } from '@tanstack/react-query';

import { axiosService } from '@/utils/axiosService';

export const useGetTempatTugasByPkid = (pkid: number) => {
  return useMutation({
    mutationKey: ['getTempatTugasByPkid'],
    mutationFn: async () => {
      const response = await axiosService().get(`api/tempat-tugas/${pkid}`);
      return response.data;
    },
  });
};

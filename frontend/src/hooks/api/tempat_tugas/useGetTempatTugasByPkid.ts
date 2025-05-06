import { useQuery } from '@tanstack/react-query';

import { axiosService } from '@/utils/axiosService';

export const useGetTempatTugasByPkid = (pkid: number) => {
  return useQuery({
    queryKey: ['getTempatTugasByPkid'],
    queryFn: async () => {
      const response = await axiosService().get(`api/tempat-tugas/${pkid}`);
      return response.data;
    },
  });
};

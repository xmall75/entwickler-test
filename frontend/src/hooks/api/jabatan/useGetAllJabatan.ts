import { useQuery } from '@tanstack/react-query';

import { axiosService } from '@/utils/axiosService';

export const useGetAllJabatan = () => {
  return useQuery({
    queryKey: ['getAllJabatan'],
    queryFn: async () => {
      const response = await axiosService().get('api/jabatan');
      return response.data;
    },
  });
};

import { useQuery } from '@tanstack/react-query';

import { axiosService } from '@/utils/axiosService';

export const useGetAllPegawai = () => {
  return useQuery({
    queryKey: ['getAllPegawai'],
    queryFn: async () => {
      const response = await axiosService().get('api/pegawai');
      return response.data;
    },
  });
};

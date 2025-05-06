import { useQuery } from '@tanstack/react-query';

import { axiosService } from '@/utils/axiosService';

export const useGetAllUnitKerja = () => {
  return useQuery({
    queryKey: ['getAllUnitKerja'],
    queryFn: async () => {
      const response = await axiosService().get('api/unit-kerja');
      return response.data;
    },
  });
};

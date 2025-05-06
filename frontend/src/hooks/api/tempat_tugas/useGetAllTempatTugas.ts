import { useQuery } from '@tanstack/react-query';

import { axiosService } from '@/utils/axiosService';

export const useGetAllTempatTugas = () => {
  return useQuery({
    queryKey: ['getAllTempatTugas'],
    queryFn: async () => {
      const response = await axiosService().get('api/tempat-tugas');
      return response.data;
    },
  });
};

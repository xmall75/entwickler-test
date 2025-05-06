import { useMutation } from '@tanstack/react-query';

import { axiosService } from '@/utils/axiosService';

export const useGetAllTempatTugas = () => {
  return useMutation({
    mutationKey: ['getAllTempatTugas'],
    mutationFn: async () => {
      const response = await axiosService().get('api/tempat-tugas');
      return response.data;
    },
  });
};

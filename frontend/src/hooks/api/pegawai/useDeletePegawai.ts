import { useMutation } from '@tanstack/react-query';

import { axiosService } from '@/utils/axiosService';

export const useDeletePegawai = (pkid: number) => {
  return useMutation({
    mutationKey: ['deletePegawai'],
    mutationFn: async () => {
      const response = await axiosService().delete(`api/pegawai/${pkid}`);
      return response.data;
    },
  });
};

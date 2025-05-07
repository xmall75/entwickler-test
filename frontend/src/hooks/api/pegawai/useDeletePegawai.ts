import { useMutation } from '@tanstack/react-query';

import { axiosService } from '@/utils/axiosService';

export const useDeletePegawai = () => {
  return useMutation({
    mutationKey: ['deletePegawai'],
    mutationFn: async (pkid: number) => {
      const response = await axiosService().delete(
        `api/pegawai/delete/${pkid}`,
      );
      return response.data;
    },
  });
};

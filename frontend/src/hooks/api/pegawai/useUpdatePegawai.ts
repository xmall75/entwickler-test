import { useMutation } from '@tanstack/react-query';

import { axiosService } from '@/utils/axiosService';
import { PegawaiInputProperty } from '@/types/pegawai';

export const useUpdatePegawai = () => {
  return useMutation({
    mutationKey: ['updatePegawai'],
    mutationFn: async ({
      pkid,
      data,
    }: {
      pkid: number;
      data: Partial<PegawaiInputProperty>;
    }) => {
      const response = await axiosService().put(`api/pegawai/${pkid}`, data);
      return response.data;
    },
  });
};

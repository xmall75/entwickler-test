import { useMutation } from '@tanstack/react-query';

import { axiosService } from '@/utils/axiosService';
import { PegawaiInputProperty } from '@/types/pegawai';

export const useUpdatePegawai = (
  pkid: number,
  data: Partial<PegawaiInputProperty>,
) => {
  return useMutation({
    mutationKey: ['updatePegawai'],
    mutationFn: async () => {
      const response = await axiosService().put(`api/pegawai/${pkid}`, data);
      return response.data;
    },
  });
};

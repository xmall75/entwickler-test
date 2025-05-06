import { useMutation } from '@tanstack/react-query';

import { axiosService } from '@/utils/axiosService';
import { PegawaiInputProperty } from '@/types/pegawai';

export const useCreatePegawai = (data: PegawaiInputProperty) => {
  return useMutation({
    mutationKey: ['createPegawai'],
    mutationFn: async () => {
      const response = await axiosService().post(`api/pegawai`, data);
      return response.data;
    },
  });
};

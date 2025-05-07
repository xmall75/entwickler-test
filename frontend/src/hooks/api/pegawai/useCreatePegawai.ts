import { useMutation } from '@tanstack/react-query';

import { axiosService } from '@/utils/axiosService';
import { PegawaiInputProperty } from '@/types/pegawai';

export const useCreatePegawai = () => {
  return useMutation({
    mutationKey: ['createPegawai'],
    mutationFn: async (data: PegawaiInputProperty) => {
      const response = await axiosService().post(`api/pegawai`, {
        ...data,
        foto: data?.foto?.[0].name,
      });
      return response.data;
    },
  });
};

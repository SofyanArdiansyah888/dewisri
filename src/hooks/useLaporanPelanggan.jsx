import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import { useError } from "./useError";
import { useSuccess } from "./useSuccess";

export function useLaporanPelanggan(data,onSuccess) {
  const { setErrorMessage } = useError();
  
  function fetchLaporan({queryKey}) {
    return  api.get(`laporan-pelanggan?date=${queryKey[1].date}&type=${queryKey[1].type}`);
  }
  return useQuery(["laporan-pelanggan",data], fetchLaporan, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => data,
  });
}

export function useExportLaporanPelanggan(onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  
  function exportLaporan(data) {
    return api.post(`laporan-pelanggan/export`, data,"blob");
  }
  return useMutation(exportLaporan, {
    onSuccess: (data) => {
      
      if(onSuccessCallback)
      onSuccessCallback(data);
    },
    onError: (error) => {
      setErrorMessage(error?.message);
    },
  });
}

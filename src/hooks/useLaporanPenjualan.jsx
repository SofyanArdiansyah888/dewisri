import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import { useError } from "./useError";
import { useSuccess } from "./useSuccess";

export function useLaporanPenjualan(data,onSuccess) {
  const { setErrorMessage } = useError();
  
  function fetchLaporan({queryKey}) {
    return  api.get(`laporan-penjualan?date=${queryKey[1].date}&type=${queryKey[1].type}`);
  }
  return useQuery(["laporan-penjualan",data], fetchLaporan, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => data,
  });
}

export function useExportLaporanPenjualan(onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  
  function exportLaporan(data) {
    return api.post(`laporan-penjualan/export`, data,"blob");
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

import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import { useError } from "./useError";
import { useSuccess } from "./useSuccess";

export function useLaporanPenjualanProduct(data,onSuccess) {
  const { setErrorMessage } = useError();
  
  function fetchLaporan({queryKey}) {
    return  api.get(`laporan-produk?date=${queryKey[1].date}&type=${queryKey[1].type}`);
  }
  return useQuery(["laporan-produk",data], fetchLaporan, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => data,
  });
}

export function useExportLaporanPenjualanProduct(onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  
  function exportLaporan(data) {
    return api.post(`laporan-produk/export`, data,"blob");
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

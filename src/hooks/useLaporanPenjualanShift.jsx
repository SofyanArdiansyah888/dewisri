import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import { useError } from "./useError";
import { useSuccess } from "./useSuccess";

export function useLaporanPenjualanShift(data,onSuccess) {
  const { setErrorMessage } = useError();
  
  function fetchLaporan({queryKey}) {
    return  api.get(`laporan-penjualan-shift?date=${queryKey[1].date}&type=${queryKey[1].type}`);
  }
  return useQuery(["laporan-penjualan-shift",data], fetchLaporan, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => data,
  });
}


export function useExportLaporanPenjualanShift(onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  
  function exportLaporan(data) {
    return api.post(`laporan-penjualan-shift/export`, data,"blob");
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

export function usePrintLaporanPenjualanShift(onSuccessCallback){
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  
  function exportLaporan(data) {
    return api.post(`laporan-penjualan-shift/print`, data);
  }
  return useMutation(exportLaporan, {
    onSuccess: (data) => {
      setSuccessMessage('Cetak Laporan Sedang Dilakukan')
      if(onSuccessCallback)
       onSuccessCallback(data);
    },
    onError: (error) => {
      setErrorMessage(error?.message);
    },
  });
}
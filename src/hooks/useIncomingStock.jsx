import { useMutation, useQuery } from "react-query";
import api from "../services/api";
import { useError } from "./useError";
import { useSuccess } from "./useSuccess";

export function useCreateIncomingStock(onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();

  function createIncomingStocks(data) {
    return api.post(`incoming-stocks`, data);
  }
  return useMutation(createIncomingStocks, {
    onSuccess:(data) => {
      setSuccessMessage('Berhasil Membuat Stok Masuk')
      onSuccessCallback(data)
    },
    onError: (error) => { setErrorMessage(error?.message)},
  });
}

export function useIncomingStocks(onSuccess) {
  const { setErrorMessage } = useError();
  function fetchIncomingStocks() {
    return () => api.get(`incoming-stocks`);
  }
  return useQuery(["incoming-stocks"], fetchIncomingStocks(), {
    onSuccess,
    onError: (error) => { setErrorMessage(error?.message)},
    select: (data) => data.data,
  });
}

export function useIncomingStock(incomingStockId,onSuccess) {
  const { setErrorMessage } = useError();
  function fetchIncomingStocks({queryKey}) {
    return  api.get(`incoming-stocks/${queryKey[1]}`);
  }
  return useQuery(["incoming-stock",incomingStockId], fetchIncomingStocks, {
    onSuccess,
    onError: (error) => { setErrorMessage(error?.message)},
    select: (data) => data.data,
  });
}

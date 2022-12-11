import { useMutation, useQuery } from "react-query";
import api from "../services/api";
import { useError } from "./useError";
import { useSuccess } from "./useSuccess";

export function useCreateWastedStock(onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  
  function createWastedStocks(data) {
    return api.post(`wasted-stocks`, data);
  }
  return useMutation(createWastedStocks, {
    onSuccess: (data) => {
      setSuccessMessage("Berhasil Membuat Stok Terbuang");
      onSuccessCallback(data);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

export function useWastedStocks(onSuccess) {
  const { setErrorMessage } = useError();
  function fetchWastedStocks() {
    return () => api.get(`wasted-stocks`);
  }
  return useQuery(["wasted-stocks"], fetchWastedStocks(), {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => data.data,
  });
}

export function useWastedStock(wastedStockId, onSuccess) {
  const { setErrorMessage } = useError();
  function fetchWastedStocks({ queryKey }) {
    return api.get(`wasted-stocks/${queryKey[1]}`);
  }
  return useQuery(["wasted-stock", wastedStockId], fetchWastedStocks, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => data.data,
  });
}

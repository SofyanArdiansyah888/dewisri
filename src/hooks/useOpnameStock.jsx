import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import { useError } from "./useError";
import { useSuccess } from "./useSuccess";

export function useCreateOpnameStock(onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const queryClient = useQueryClient();

  function createOpnameStocks(data) {
    return api.post(`opname-stocks`, data);
  }
  return useMutation(createOpnameStocks, {
   onSuccess: (data) => {
      onSuccessCallback(data)
      setSuccessMessage('Berhasil Membuat Stok Opname')
      queryClient.invalidateQueries({ queryKey: ["opname-stock"] });
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

export function useOpnameStocks(onSuccess) {
  const { setErrorMessage } = useError();
  function fetchOpnameStocks() {
    return () => api.get(`opname-stocks`);
  }
  return useQuery(["opname-stocks"], fetchOpnameStocks(), {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => data.data,
  });
}

export function useOpnameStock(opnameStockId, onSuccess) {
  const { setErrorMessage } = useError();
  function fetchOpnameStocks({ queryKey }) {
    return api.get(`opname-stocks/${queryKey[1]}`);
  }
  return useQuery(["opname-stock", opnameStockId], fetchOpnameStocks, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => data.data,
  });
}

import { useMutation, useQuery } from "react-query";
import api from "../services/api";
import { useError } from "./useError";

export function useCreateOpnameStock(onSuccess) {
  const { setErrorMessage } = useError();
  function createOpnameStocks(data) {
    return api.post(`opname-stocks`, data);
  }
  return useMutation(createOpnameStocks, {
    onSuccess,
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

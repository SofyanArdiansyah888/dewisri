import { useMutation, useQuery } from "react-query";
import api from "../services/api";

export function useCreateOpnameStock(onSuccess) {
  function createOpnameStocks(data) {
    return api.post(`opname-stocks`, data);
  }
  return useMutation(createOpnameStocks, {
    onSuccess,
    onError: () => {},
  });
}


export function useOpnameStocks(onSuccess) {
  function fetchOpnameStocks() {
    return () => api.get(`opname-stocks`);
  }
  return useQuery(["opname-stocks"], fetchOpnameStocks(), {
    onSuccess,
    onError: () => {},
    select: (data) => data.data,
  });
}

export function useOpnameStock(opnameStockId,onSuccess) {
  
  function fetchOpnameStocks({queryKey}) {
    return  api.get(`opname-stocks/${queryKey[1]}`);
  }
  return useQuery(["opname-stock",opnameStockId], fetchOpnameStocks, {
    onSuccess,
    onError: () => {},
    select: (data) => data.data,
  });
}

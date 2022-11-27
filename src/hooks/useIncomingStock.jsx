import { useMutation, useQuery } from "react-query";
import api from "../services/api";

export function useCreateIncomingStock(onSuccess) {
  function createIncomingStocks(data) {
    return api.post(`incoming-stocks`, data);
  }
  return useMutation(createIncomingStocks, {
    onSuccess,
    onError: () => {},
  });
}

export function useIncomingStocks(onSuccess) {
  function fetchIncomingStocks() {
    return () => api.get(`incoming-stocks`);
  }
  return useQuery(["incoming-stocks"], fetchIncomingStocks(), {
    onSuccess,
    onError: () => {},
    select: (data) => data.data,
  });
}

export function useIncomingStock(incomingStockId,onSuccess) {
  
  function fetchIncomingStocks({queryKey}) {
    return  api.get(`incoming-stocks/${queryKey[1]}`);
  }
  return useQuery(["incoming-stock",incomingStockId], fetchIncomingStocks, {
    onSuccess,
    onError: () => {},
    select: (data) => data.data,
  });
}

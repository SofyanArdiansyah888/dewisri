import { useMutation, useQuery } from "react-query";
import api from "../services/api";

export function useCreateWastedStock(onSuccess) {
  function createWastedStocks(data) {
    return api.post(`wasted-stocks`, data);
  }
  return useMutation(createWastedStocks, {
    onSuccess,
    onError: () => {},
  });
}

export function useWastedStocks(onSuccess) {
  function fetchWastedStocks() {
    return () => api.get(`wasted-stocks`);
  }
  return useQuery(["wasted-stocks"], fetchWastedStocks(), {
    onSuccess,
    onError: () => {},
    select: (data) => data.data,
  });
}

export function useWastedStock(wastedStockId,onSuccess) {
  
  function fetchWastedStocks({queryKey}) {
    return  api.get(`wasted-stocks/${queryKey[1]}`);
  }
  return useQuery(["wasted-stock",wastedStockId], fetchWastedStocks, {
    onSuccess,
    onError: () => {},
    select: (data) => data.data,
  });
}

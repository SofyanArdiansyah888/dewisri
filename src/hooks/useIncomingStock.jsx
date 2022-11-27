import { useQuery } from "react-query";
import api from "../services/api";

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

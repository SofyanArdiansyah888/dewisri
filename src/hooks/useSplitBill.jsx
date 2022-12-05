import { useMutation, useQuery } from "react-query";
import api from "../services/api";

export function useSplitBill(data,onSuccess) {
  function fetchSplitBill({queryKey}) {
    const orderId = queryKey[1];
    return api.get(`split-bill?order_id=${orderId}`);
  }
  return useQuery(["split-bill",data], fetchSplitBill, {
    onError: () => {},
    onSuccess,
    select: (data) => data,
  });
}

export function useCreateSplitBill(onSuccess) {
  function createSplitBill(data) {
    return api.post(`split-bill`, data);
  }
  return useMutation(createSplitBill, {
    onSuccess,
    onError: () => {},
  });
}
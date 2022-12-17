import { useMutation, useQuery } from "react-query";
import api from "../services/api";
import { useError } from "./useError";
import { useSuccess } from "./useSuccess";

export function useSplitBill(data, onSuccess) {
  const { setErrorMessage } = useError();
  function fetchSplitBill({ queryKey }) {
    const orderId = queryKey[1];
    return api.get(`split-bill?order_id=${orderId}`);
  }
  return useQuery(["split-bill", data], fetchSplitBill, {
    onError: (error) => {
      setErrorMessage(error.message);
    },
    onSuccess,
    select: (data) => data,
  });
}

export function useCreateSplitBill(onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();

  function createSplitBill(data) {
    return api.post(`split-bill`, data);
  }
  return useMutation(createSplitBill, {
    onSuccess: (data) => {
      setSuccessMessage("Berhasil Pisah Bill");
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

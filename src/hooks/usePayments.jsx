import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import { useError } from "./useError";
import { useSuccess } from "./useSuccess";


export function usePayments(onSuccess, data) {
  const { setErrorMessage } = useError();
  function fetchData({ queryKey }) {
    const { page, date } = queryKey[1];
    return api.get(`payments?page=${page}&date=${date}`);
  }
  return useQuery(["payments", data], fetchData, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => data,
  });
}


export function useUnpaidPayments(onSuccess, data) {
  const { setErrorMessage } = useError();
  function fetchData({ queryKey }) {
    const { order_id, table_id } = queryKey[1];
    return api.get(`unpaid-payments?order_id=${order_id}&table_id=${table_id}`);
  }
  return useQuery(["unpaid-payments", data], fetchData, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => data,
  });
}

export function useCreatePayment(onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();

  function createPayments(data) {
    return api.post(`payments`, data);
  }
  return useMutation(createPayments, {
    onSuccess: (data) => {
      if (onSuccessCallback) onSuccessCallback(data);
      setSuccessMessage("Berhasil Melakukan Pembayaran");
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

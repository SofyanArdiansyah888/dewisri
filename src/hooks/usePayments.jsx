import { useMutation, useQuery } from "react-query";
import api from "../services/api";
import { useError } from "./useError";

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

export function useCreatePayment(onSuccess) {
  const { setErrorMessage } = useError();
  function createPayments(data) {
    return api.post(`payments`, data);
  }
  return useMutation(createPayments, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import { useError } from "./useError";
import { useSuccess } from "./useSuccess";

export function useOrderTable(tableId, onSuccess) {
  const { setErrorMessage } = useError();
  function fetchTables(tableId) {
    return () => api.get(`tables/${tableId}/orders`);
  }
  return useQuery(["table-order"], fetchTables(tableId), {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => data,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();

  function createOrder({ id, data }) {
    return api.post(`tables/${id}/orders`, data);
  }
  return useMutation(createOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["table-order"] });
      setSuccessMessage('Barhasil Melakukan Order')
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

export function useTransferOrder(onSuccessCallback) {
  const queryClient = useQueryClient();
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  
  function createOrder(data) {
    return api.post(`transfer-order`, data);
  }
  return useMutation(createOrder, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["table-order"] });
      setSuccessMessage('Barhasil Transfer Order')
      onSuccessCallback(data);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

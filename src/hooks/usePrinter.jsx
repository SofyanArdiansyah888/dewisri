import { useMutation, useQuery } from "react-query";
import api from "../services/api";
import { useError } from "./useError";

export function usePrinter(onSuccess) {
  const { setErrorMessage } = useError();
  function fetchPrinter() {
    return () => api.get(`printers`);
  }
  return useQuery(["printers"], fetchPrinter(), {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => data.data,
  });
}

export function useCreatePrinter(onSuccess) {
  const { setErrorMessage } = useError();
  function createPrinter(data) {
    return api.post(`printers`, data);
  }
  return useMutation(createPrinter, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

export function useUpdatePrinter(printerId, onSuccess) {
  const { setErrorMessage } = useError();
  function updatePrinter(data) {
    return api.put(`printers/${printerId}`, data);
  }
  return useMutation(updatePrinter, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

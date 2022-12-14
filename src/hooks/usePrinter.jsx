import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import { useError } from "./useError";
import { useSuccess } from "./useSuccess";

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

export function useCreatePrinter(onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const queryClient = useQueryClient();

  function createPrinter(data) {
    return api.post(`printers`, data);
  }
  return useMutation(createPrinter, {
    onSuccess: (data) => {
      setSuccessMessage("Berhasil Membuat Printer");
      if (onSuccessCallback) onSuccessCallback(data);
      queryClient.invalidateQueries({ queryKey: ["printers"] });
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

export function useUpdatePrinter(printerId, onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const queryClient = useQueryClient();
  function updatePrinter(data) {
    return api.put(`printers/${printerId}`, data);
  }
  return useMutation(updatePrinter, {
    onSuccess: (data) => {
      setSuccessMessage("Berhasil Mengupdate Printer");
      if (onSuccessCallback) onSuccessCallback(data);
      queryClient.invalidateQueries({ queryKey: ["printers"] });
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

export function useDeletePrinter(printerId, onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const queryClient = useQueryClient();
  function deletePrinter() {
    return api.delete(`printers/${printerId}`);
  }
  return useMutation(deletePrinter, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["printers"] });
      setSuccessMessage("Berhasil Menghapus Printer");
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

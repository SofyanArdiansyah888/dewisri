import { useMutation, useQuery } from "react-query";
import api from "../services/api";

export function usePrinter(onSuccess) {
    function fetchPrinter() {
      return () => api.get(`printers`);
    }
    return useQuery(["printers"], fetchPrinter(), {
      onSuccess,
      onError: () => {},
      select: (data) => data.data,
    });
  }
  
  export function useCreatePrinter(onSuccess) {
    function createPrinter(data) {
      return api.post(`printers`, data);
    }
    return useMutation(createPrinter, {
      onSuccess,
      onError: () => {},
    });
  }
  
  export function useUpdatePrinter(printerId, onSuccess) {
    function updatePrinter(data) {
      return api.put(`printers/${printerId}`, data);
    }
    return useMutation(updatePrinter, {
      onSuccess,
      onError: () => {},
    });
  }
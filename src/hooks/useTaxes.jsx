import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import { useError } from "./useError";
import { useSuccess } from "./useSuccess";

export function useTaxes() {
  const { setErrorMessage } = useError();
  function fetchTaxes() {
    return api.get(`taxes`);
  }
  return useQuery(["taxes"], fetchTaxes, {
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => {
      if (data.data) {
        return data?.data;
      }
    },
  });
}

export function useUpdateTax(taxId, onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const query = useQueryClient();
  function updateTax(data) {
    return api.put(`taxes/${taxId}`, data);
  }
  return useMutation(updateTax, {
    onSuccess: (data) => {
      query.invalidateQueries({ queryKey: ["taxes"] });
      setSuccessMessage("Berhasil Mengupdate Pajak");
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

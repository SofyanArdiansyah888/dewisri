import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import { useError } from "./useError";
import { useSuccess } from "./useSuccess";

export function useCreateCashFlow(onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const queryClient = useQueryClient();
  function createCategories(data) {
    return api.post(`cash-flow`, data);
  }
  return useMutation(createCategories, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cash-flow"] });
      setSuccessMessage("Berhasil Menginput Cash");
      if(onSuccessCallback)
      onSuccessCallback(data);
    },
    onError: (error) => {
      setErrorMessage(error?.message);
    },
  });
}

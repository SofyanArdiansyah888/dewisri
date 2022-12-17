import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import { useError } from "./useError";
import { useSuccess } from "./useSuccess";



export function useCreateVoidOrder(onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const queryClient = useQueryClient();
  function createVoidOrder(data) {
    return api.post(`void-order`, data);
  }
  return useMutation(createVoidOrder, {
    onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["table-order"] });
      setSuccessMessage("Berhasil Melakukan Void");
      if(onSuccessCallback)
      onSuccessCallback(data);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}


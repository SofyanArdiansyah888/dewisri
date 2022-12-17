import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import { useError } from "./useError";
import { useSuccess } from "./useSuccess";



export function usePrintOrder(onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  
  function printOrder(data) {
    return api.post(`print-order`, data);
  }
  return useMutation(printOrder, {
    onSuccess: (data) => {
      setSuccessMessage("Berhasil Membuat Mencetak Bill");
      if(onSuccessCallback)
      onSuccessCallback(data);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}


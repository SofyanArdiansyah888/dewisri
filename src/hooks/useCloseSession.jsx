import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import { useError } from "./useError";
import { useSuccess } from "./useSuccess";

export function useCloseSession(onSuccess) {
    const { setErrorMessage } = useError();
    function fetchCloseSession() {
      return api.get(`close-session`);
    }
    return useQuery(["close-session"], fetchCloseSession, {
      onSuccess,
      onError: (error) => {
        setErrorMessage(error?.message);
      },
      select: (data) => data.last_session,
    });
  }
  

export function useCreateCloseSession(onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const queryClient = useQueryClient();
  function closeSession(data) {
    return api.post(`close-session`, data);
  }
  return useMutation(closeSession, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["close-session"] });
      setSuccessMessage("Berhasil Mengupdate Data");
      if(onSuccessCallback)
      onSuccessCallback(data);
    },
    onError: (error) => {
      setErrorMessage(error?.message);
    },
  });
}

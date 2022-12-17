import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import { useError } from "./useError";
import { useSuccess } from "./useSuccess";

export function useOpenSession(onSuccessCallback) {
  const { setErrorMessage } = useError();

  function fetchSession() {
    return api.get(`open-session`);
  }
  return useQuery(["open-session"], fetchSession, {
    onSuccess: (data) => {
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => data.data,
  });
}

export function useCreateOpenSession(onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const queryClient = useQueryClient();
  function createOpenSession(data) {
    return api.post(`open-session`, data);
  }
  return useMutation(createOpenSession, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["close-session"] });
      if (onSuccessCallback) onSuccessCallback(data);
      setSuccessMessage("Berhasil Buka Sesi");
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

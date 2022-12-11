import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import { useError } from "./useError";

export function useOpenSession(onSuccessCallback) {
  const { setErrorMessage } = useError();
  
  function fetchSession() {
    return api.get(`open-session`);
  }
  return useQuery(["open-session"], fetchSession, {
    onSuccess: (data) => {
      onSuccessCallback(data)
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
  function createOpenSession(data) {
    return api.post(`open-session`, data);
  }
  return useMutation(createOpenSession, {
    onSuccess: (data) => {
      onSuccessCallback(data)
      setSuccessMessage('Berhasil Buka Sesi')
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}
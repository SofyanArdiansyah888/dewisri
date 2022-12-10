import { useMutation, useQuery } from "react-query";
import api from "../services/api";
import { useError } from "./useError";

export function useOpenSession(onSuccess) {
  const { setErrorMessage } = useError();
  function fetchSession() {
    return () => api.get(`open-session`);
  }
  return useQuery(["open-session"], fetchSession(), {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => data.data,
  });
}

export function useCreateOpenSession(onSuccess) {
  const { setErrorMessage } = useError();
  function createOpenSession(data) {
    return api.post(`open-session`, data);
  }
  return useMutation(createOpenSession, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}
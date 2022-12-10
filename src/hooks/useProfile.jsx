import { useMutation } from "react-query";
import api from "../services/api";
import { useError } from "./useError";

export function useChangePassword(onSuccess, onError) {
  const { setErrorMessage } = useError();
  function updateProfile(data) {
    return api.put(`profile/change-password`, data);
  }
  return useMutation(updateProfile, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

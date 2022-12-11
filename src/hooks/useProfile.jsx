import { useMutation } from "react-query";
import api from "../services/api";
import { useError } from "./useError";
import { useSuccess } from "./useSuccess";

export function useChangePassword(onSuccessCallback, onErrorCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  function updateProfile(data) {
    return api.put(`profile/change-password`, data);
  }
  return useMutation(updateProfile, {
    onSuccess: (data) => {
      onSuccessCallback(data)
      setSuccessMessage('Berhasil Mengubah Password')
    },
    onError: (error) => {
      setErrorMessage(error.message);
      onErrorCallback(error)
    },
  });
}

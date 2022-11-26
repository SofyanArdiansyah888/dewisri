import { useMutation } from "react-query";
import api from "../services/api";

export function useChangePassword( onSuccess, onError) {
    function updateProfile(data) {
      return api.put(`profile/change-password`, data);
    }
    return useMutation(updateProfile, {
      onSuccess,
      onError,
    });
  }
  
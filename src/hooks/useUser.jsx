import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import { useError } from "./useError";
import { useSuccess } from "./useSuccess";

export function useUsers(onSuccess) {
  const { setErrorMessage } = useError();
  function fetchUser() {
    return api.get(`users`);
  }
  return useQuery(["users"], fetchUser, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => data.data,
  });
}

export function useCreateUser(onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const queryClient = useQueryClient();
  function createUser(data) {
    return api.post(`users`, data);
  }
  return useMutation(createUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setSuccessMessage("Berhasil Membuat User");
      onSuccessCallback(data);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

export function useUpdateUser(userId, onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const query = useQueryClient();
  function updateUser(data) {
    return api.put(`users/${userId}`, data);
  }
  return useMutation(updateUser, {
    onSuccess: (data) => {
      query.invalidateQueries({ queryKey: ["users"] });
      setSuccessMessage("Berhasil Mengupdate User");
      onSuccessCallback(data);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

export function useDeleteUser(userId, onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const query = useQueryClient();
  function deleteUser() {
    return api.delete(`users/${userId}`);
  }
  return useMutation(deleteUser, {
    onSuccess: (data) => {
      query.invalidateQueries({ queryKey: ["users"] });
      setSuccessMessage("Berhasil Menghapus User");
      onSuccessCallback(data);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

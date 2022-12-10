import { useMutation, useQuery } from "react-query";
import api from "../services/api";
import { useError } from "./useError";

export function useUsers(onSuccess) {
  const {setErrorMessage} = useError();
  function fetchUser() {
    return api.get(`users`);
  }
  return useQuery(["users"], fetchUser, {
    onSuccess,
    onError: (error) => {
      console.log(error)
      setErrorMessage(error.message)
    },
    select: (data) => data.data,
  });
}

export function useCreateUser(onSuccess) {
  const {setErrorMessage} = useError();
  function createUser(data) {
    return api.post(`users`, data);
  }
  return useMutation(createUser, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message)
    },
  });
}

export function useUpdateUser(userId, onSuccess) {
  const {setErrorMessage} = useError();
  function updateUser(data) {
    return api.put(`users/${userId}`, data);
  }
  return useMutation(updateUser, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message)
    },
  });
}

export function useDeleteUser(userId, onSuccess) {
  const {setErrorMessage} = useError();
  function deleteUser() {
    return api.delete(`users/${userId}`);
  }
  return useMutation(deleteUser, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message)
    },
  });
}


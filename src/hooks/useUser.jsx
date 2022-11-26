import { useMutation, useQuery } from "react-query";
import api from "../services/api";

export function useUsers(onSuccess) {
  function fetchUser() {
    return () => api.get(`users`);
  }
  return useQuery(["users"], fetchUser(), {
    onSuccess,
    onError: () => {},
    select: (data) => data.data,
  });
}

export function useCreateUser(onSuccess) {
  function createUser(data) {
    return api.post(`users`, data);
  }
  return useMutation(createUser, {
    onSuccess,
    onError: () => {},
  });
}

export function useUpdateUser(userId, onSuccess) {
  function updateUser(data) {
    return api.put(`users/${userId}`, data);
  }
  return useMutation(updateUser, {
    onSuccess,
    onError: () => {},
  });
}

export function useDeleteUser(userId, onSuccess) {
  function deleteUser() {
    return api.delete(`users/${userId}`);
  }
  return useMutation(deleteUser, {
    onSuccess,
    onError: () => {},
  });
}


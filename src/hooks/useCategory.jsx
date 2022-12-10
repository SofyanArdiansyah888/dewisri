import { useMutation, useQuery } from "react-query";
import api from "../services/api";
import { useError } from "./useError";

export function useCategory(onSuccess) {
  const { setErrorMessage } = useError();
  function fetchCategories() {
    return () => api.get(`categories`);
  }
  return useQuery(["categories"], fetchCategories(), {
    onSuccess,
    onError: (error) => {setErrorMessage(error?.message)},
    select: (data) => data.data,
  });
}

export function useCreateCategory(onSuccess) {
  const { setErrorMessage } = useError();
  function createCategories(data) {
    return api.post(`categories`, data);
  }
  return useMutation(createCategories, {
    onSuccess,
    onError: (error) => {setErrorMessage(error?.message)},
  });
}

export function useUpdateCategory(userId, onSuccess) {
  const { setErrorMessage } = useError();
  function updateCategories(data) {
    return api.put(`categories/${userId}`, data);
  }
  return useMutation(updateCategories, {
    onSuccess,
    onError: (error) => {setErrorMessage(error?.message)},
  });
}

export function useDeleteCategory(userId, onSuccess) {
  const { setErrorMessage } = useError();
  function deleteCategories() {
    return api.delete(`categories/${userId}`);
  }
  return useMutation(deleteCategories, {
    onSuccess,
    onError: (error) => {setErrorMessage(error?.message)},
  });
}

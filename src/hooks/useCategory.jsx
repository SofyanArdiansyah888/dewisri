import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import { useError } from "./useError";
import { useSuccess } from "./useSuccess";

export function useCategory(onSuccess) {
  const { setErrorMessage } = useError();
  function fetchCategories() {
    return () => api.get(`categories`);
  }
  return useQuery(["categories"], fetchCategories(), {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error?.message);
    },
    select: (data) => data.data,
  });
}

export function useCreateCategory(onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const queryClient = useQueryClient();
  function createCategories(data) {
    return api.post(`categories`, data);
  }
  return useMutation(createCategories, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setSuccessMessage("Berhasil Membuat Kategori");
      onSuccessCallback(data);
    },
    onError: (error) => {
      setErrorMessage(error?.message);
    },
  });
}

export function useUpdateCategory(userId, onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const queryClient = useQueryClient();
  function updateCategories(data) {
    return api.put(`categories/${userId}`, data);
  }
  return useMutation(updateCategories, {
    onSuccess: (data) => {
      onSuccessCallback(data)
      setSuccessMessage('Berhasil Mengupdate Kategori')
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      setErrorMessage(error?.message);
    },
  });
}

export function useDeleteCategory(userId, onSuccess) {
  const { setErrorMessage } = useError();
  function deleteCategories() {
    return api.delete(`categories/${userId}`);
  }
  return useMutation(deleteCategories, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error?.message);
    },
  });
}

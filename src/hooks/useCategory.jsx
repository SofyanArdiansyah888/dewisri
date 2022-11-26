import { useMutation, useQuery } from "react-query";
import api from "../services/api";

export function useCategory(onSuccess) {
  function fetchCategories() {
    return () => api.get(`categories`);
  }
  return useQuery(["categories"], fetchCategories(), {
    onSuccess,
    onError: () => {},
    select: (data) => data.data,
  });
}

export function useCreateCategory(onSuccess) {
  function createCategories(data) {
    return api.post(`categories`, data);
  }
  return useMutation(createCategories, {
    onSuccess,
    onError: () => {},
  });
}

export function useUpdateCategory(userId, onSuccess) {
  function updateCategories(data) {
    return api.put(`categories/${userId}`, data);
  }
  return useMutation(updateCategories, {
    onSuccess,
    onError: () => {},
  });
}

export function useDeleteCategory(userId, onSuccess) {
  function deleteCategories() {
    return api.delete(`categories/${userId}`);
  }
  return useMutation(deleteCategories, {
    onSuccess,
    onError: () => {},
  });
}

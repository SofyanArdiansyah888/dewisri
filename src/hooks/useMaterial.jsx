import { useMutation, useQuery } from "react-query";
import api from "../services/api";

export function useMaterial(onSuccess) {
  function fetchdMaterial() {
    return () => api.get(`materials`);
  }
  return useQuery(["materials"], fetchdMaterial(), {
    onSuccess,
    onError: () => {},
    select: (data) => data.data,
  });
}

export function useCreateMaterial(onSuccess) {
  function createdMaterial(data) {
    return api.post(`materials`, data);
  }
  return useMutation(createdMaterial, {
    onSuccess,
    onError: () => {},
  });
}

export function useUpdateMaterial(userId, onSuccess) {
  function updatedMaterial(data) {
    return api.put(`materials/${userId}`, data);
  }
  return useMutation(updatedMaterial, {
    onSuccess,
    onError: () => {},
  });
}

export function useDeleteMaterial(userId, onSuccess) {
  function deletedMaterial() {
    return api.delete(`materials/${userId}`);
  }
  return useMutation(deletedMaterial, {
    onSuccess,
    onError: () => {},
  });
}

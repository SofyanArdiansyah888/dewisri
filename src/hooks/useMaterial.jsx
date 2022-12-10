import { useMutation, useQuery } from "react-query";
import api from "../services/api";
import { useError } from "./useError";

export function useRawMaterial(onSuccess) {
  const { setErrorMessage } = useError();
  function fetchdMaterial() {
    return () => api.get(`materials?type=RAW`);
  }
  return useQuery(["raw-materials"], fetchdMaterial(), {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => data.data,
  });
}

export function useSupportMaterial(onSuccess) {
  const { setErrorMessage } = useError();
  function fetchdMaterial() {
    return () => api.get(`materials?type=SUPPORT`);
  }
  return useQuery(["support-materials"], fetchdMaterial(), {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => data.data,
  });
}

export function useMaterial(onSuccess) {
  const { setErrorMessage } = useError();
  function fetchdMaterial() {
    return () => api.get(`materials`);
  }
  return useQuery(["materials"], fetchdMaterial(), {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => data.data,
  });
}

export function useCreateMaterial(onSuccess) {
  const { setErrorMessage } = useError();
  function createdMaterial(data) {
    return api.post(`materials`, data);
  }
  return useMutation(createdMaterial, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

export function useUpdateMaterial(userId, onSuccess) {
  const { setErrorMessage } = useError();
  function updatedMaterial(data) {
    return api.put(`materials/${userId}`, data);
  }
  return useMutation(updatedMaterial, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

export function useDeleteMaterial(userId, onSuccess) {
  const { setErrorMessage } = useError();
  function deletedMaterial() {
    return api.delete(`materials/${userId}`);
  }
  return useMutation(deletedMaterial, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

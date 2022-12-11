import { useMutation, useQuery, useQueryClient } from "react-query";
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

export function useCreateMaterial(onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const queryClient = useQueryClient();
  function createdMaterial(data) {
    return api.post(`materials`, data);
  }
  return useMutation(createdMaterial, {
    onSuccess: (data) => {
      onSuccessCallback(data);
      setSuccessMessage("Berhasil Membuat Bahan");
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

export function useUpdateMaterial(userId, onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const queryClient = useQueryClient();

  function updatedMaterial(data) {
    return api.put(`materials/${userId}`, data);
  }
  return useMutation(updatedMaterial, {
    onSuccess: (data) => {
      onSuccessCallback(data);
      setSuccessMessage("Berhasil Membuat Bahan");
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
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

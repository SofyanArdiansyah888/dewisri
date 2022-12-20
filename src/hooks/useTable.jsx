import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import { useError } from "./useError";
import { useSuccess } from "./useSuccess";

export function useTables(refetchInterval = null) {
  const { setErrorMessage } = useError();
  function fetchTables() {
    return api.get(`tables`);
  }
  return useQuery(["tables"], fetchTables, {
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => {
      if (data.data) {
        return data?.data?.map((table) => {
          table.isChoosen = false;
          return table;
        });
      }
    },
    refetchInterval,
  });
}

export function useFreeTables() {
  const { setErrorMessage } = useError();
  function fetchTables() {
    return api.get(`free-tables`);
  }
  return useQuery(["free-tables"], fetchTables, {
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => {
      if (data.data) {
        return data?.data?.map((table) => {
          table.isChoosen = false;
          return table;
        });
      }
    },
  });
}

export function useOrderedTables() {
  const { setErrorMessage } = useError();
  function fetchTables() {
    return api.get(`ordered-tables`);
  }
  return useQuery(["ordered-tables"], fetchTables, {
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => data?.data,
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
  });
}

export function useUpdateTables(onSuccessCallback) {
  const queryClient = useQueryClient();
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  function updateTable({ id, ...data }) {
    return api.put(`tables/${id}`, data);
  }
  return useMutation(updateTable, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      setSuccessMessage("Berhasil mengupdate data");
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

export function useCreateTable(onSuccessCallback) {
  const queryClient = useQueryClient();
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  function createTable(data) {
    return api.post(`tables`, data);
  }
  return useMutation(createTable, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      if (onSuccessCallback) onSuccessCallback(data);
      setSuccessMessage("Berhasil Membuat Meja");
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

export function useDeleteTable(tableId, onSuccessCallback) {
  const queryClient = useQueryClient();
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  function deleteTable() {
    return api.delete(`tables/${tableId}`);
  }
  return useMutation(deleteTable, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      if (onSuccessCallback) onSuccessCallback(data);
      setSuccessMessage("Berhasil Menghapus Meja");
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

export function usePindahMeja(onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const queryClient = useQueryClient();
  function pindahMeja(data) {
    return api.post(`pindah-meja`, data);
  }
  return useMutation(pindahMeja, {
    onSuccess: (data) => {
      if (onSuccessCallback) onSuccessCallback(data);
      setSuccessMessage("Pindah Meja Berhasil Dilakukan!");
      queryClient.invalidateQueries({ queryKey: ["free-tables"] });
      queryClient.invalidateQueries({ queryKey: ["tables"] });
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

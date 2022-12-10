import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import { useError } from "./useError";

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
  function updateTable({ id, ...data }) {
    return api.put(`tables/${id}`, data);
  }
  return useMutation(updateTable, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      onSuccessCallback(data);
    },
    onError: () => {},
  });
}

export function useCreateTable(onSuccessCallback) {
  const queryClient = useQueryClient();
  function createTable(data) {
    return api.post(`tables`, data);
  }
  return useMutation(createTable, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      onSuccessCallback(data);
    },
    onError: () => {},
  });
}

export function useDeleteTable(tableId, onSuccessCallback) {
  const queryClient = useQueryClient();
  function deleteTable() {
    return api.delete(`tables/${tableId}`);
  }
  return useMutation(deleteTable, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      onSuccessCallback(data);
    },
    onError: () => {},
  });
}

export function usePindahMeja(onSuccess) {
  function pindahMeja(data) {
    return api.post(`pindah-meja`, data);
  }
  return useMutation(pindahMeja, {
    onSuccess,
    onError: () => {},
  });
}

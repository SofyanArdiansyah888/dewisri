import { useMutation, useQuery } from "react-query";
import api from "../services/api";

export function useTables() {
  function fetchTables() {
    return () => api.get(`tables`);
  }
  return useQuery(["tables"], fetchTables(), {
    onError: () => {},
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

export function useFreeTables() {
    function fetchTables() {
      return  api.get(`free-tables`);
    }
    return useQuery(["free-tables"], fetchTables, {
      onError: () => {},
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

export function useUpdateTables(onSuccess) {
  function updateTable({ id, data }) {
    return api.put(`tables/${id}`, data);
  }
  return useMutation(updateTable, {
    onSuccess,
    onError: () => {},
  });
}


export function useCreateTable(onSuccess) {
  function createTable({ data }) {
    return api.post(`tables`, data);
  }
  return useMutation(createTable, {
    onSuccess,
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
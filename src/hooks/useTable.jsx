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

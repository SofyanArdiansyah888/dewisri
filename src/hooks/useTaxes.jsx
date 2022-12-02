import { useMutation, useQuery } from "react-query";
import api from "../services/api";

export function useTaxes() {
  function fetchTaxes() {
    return () => api.get(`taxes`);
  }
  return useQuery(["taxes"], fetchTaxes(), {
    onError: () => {},
    select: (data) => {
      if (data.data) {
        return data?.data;
      }
    },
  });
}
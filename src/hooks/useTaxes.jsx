import { useMutation, useQuery } from "react-query";
import api from "../services/api";
import { useError } from "./useError";

export function useTaxes() {
  const {setErrorMessage} = useError()
  function fetchTaxes() {
    return () => api.get(`taxes`);
  }
  return useQuery(["taxes"], fetchTaxes(), {
    onError: (error) => {
      setErrorMessage(error.message)
    },
    select: (data) => {
      if (data.data) {
        return data?.data;
      }
    },
  });
}
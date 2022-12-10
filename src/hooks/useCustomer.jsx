import { useMutation, useQuery } from "react-query";
import api from "../services/api";
import { useError } from "./useError";

export function useCustomers(onSuccess) {
  const { setErrorMessage } = useError();
  function fetchCustomers() {
    return () => api.get(`customers`);
  }
  return useQuery(["customers"], fetchCustomers(), {
    staleTime: 1 * 3600 * 1000,
    onError: (error) => { setErrorMessage(error?.message)},
    onSuccess,
    select: (data) => data?.data.filter((item) => item.name),
  });
}

export function useCreateCustomer(onSuccess) {
  const { setErrorMessage } = useError();
  function createCustomer(data) {
    return api.post(`customers`, data);
  }
  return useMutation(createCustomer, {
    onSuccess,
    onError: (error) => { setErrorMessage(error?.message)},
  });
}

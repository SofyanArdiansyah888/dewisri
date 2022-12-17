import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import { useError } from "./useError";
import { useSuccess } from "./useSuccess";

export function useCustomers(onSuccessCallback) {
  const { setErrorMessage } = useError();
  function fetchCustomers() {
    return () => api.get(`customers`);
  }
  return useQuery(["customers"], fetchCustomers(), {
    staleTime: 1 * 3600 * 1000,
    onError: (error) => { setErrorMessage(error?.message)},
    onSuccess: (data) => {
      if(onSuccessCallback)
      onSuccessCallback(data)
    },
    select: (data) => data?.data.filter((item) => item.name),
  });
}

export function useCreateCustomer(onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const query = useQueryClient()
  function createCustomer(data) {
    return api.post(`customers`, data);
  }
  return useMutation(createCustomer, {
    onSuccess: (data) => {
      query.invalidateQueries({queryKey:['customers']})
      setSuccessMessage('Berhasil Membuat Customer')
      if(onSuccessCallback)
      onSuccessCallback(data)
    },
    onError: (error) => { setErrorMessage(error?.message)},
  });
}


export function useUpdateCustomer(customerId, onSuccessCallback) {
  const {setErrorMessage} = useError();
  const {setSuccessMessage} = useSuccess();
  const query = useQueryClient()
  function updateCustomer(data) {
    return api.put(`customers/${customerId}`, data);
  }
  return useMutation(updateCustomer, {
    onSuccess: (data) => {
      query.invalidateQueries({queryKey:['customers']})
      setSuccessMessage('Berhasil Mengupdate Customer')
      if(onSuccessCallback)
      onSuccessCallback(data)
    },
    onError: (error) => {
      setErrorMessage(error.message)
    },
  });
}

export function useDeleteCustomer(customerId, onSuccessCallback) {
  const {setErrorMessage} = useError();
  const {setSuccessMessage} = useSuccess();
  const query = useQueryClient()
  function deleteCustomer() {
    return api.delete(`customers/${customerId}`);
  }
  return useMutation(deleteCustomer, {
    onSuccess: (data) => {
      query.invalidateQueries({queryKey:['customers']})
      setSuccessMessage('Berhasil Menghapus Customer')
      if(onSuccessCallback)
      onSuccessCallback(data)
    },
    onError: (error) => {
      setErrorMessage(error.message)
    },
  });
}

import { useMutation, useQuery } from "react-query";
import api from "../services/api";


export function useCustomers(onSuccess) {
    
    function fetchCustomers() {
        return () => api.get(`customers`);
    }
    return useQuery(['customers'], fetchCustomers(), {
        staleTime: 1 * 3600 * 1000,
        onError: () => {
            
        },
        onSuccess,
        select: (data) => data?.data.filter((item) => item.name)
    })

}


export function useCreateCustomer(onSuccess) {
    function createCustomer(data) {
      return api.post(`customers`, data);
    }
    return useMutation(createCustomer, {
      onSuccess,
      onError: () => {}
    });
  }

import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";



export function useOrderTable(tableId, onSuccess) {

    function fetchTables(tableId) {
        return () => api.get(`tables/${tableId}/orders`);
    }
    return useQuery(['table-order'], fetchTables(tableId), {
        onSuccess,
        onError: () => {
            
        },
        select: (data) => data
        // {
        //     return {
        //         ...data,
        //         products: data.products.map((item) => item.pivot),
            
        //     }
        // }
    })

}


export function useCreateOrder() {
    const queryClient = useQueryClient();
    function createOrder({id,data}) {
        
        return api.post(`tables/${id}/orders`, data)
    }
    return useMutation(createOrder, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['table-order'] })
        },
        onError: () => {
        }
    })
}

export function useTransferOrder(onSuccessCallback){
    const queryClient = useQueryClient();
    function createOrder(data) {
        return  api.post(`transfer-order`, data)
    }
    return useMutation(createOrder, {
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['table-order'] })
            onSuccessCallback(data)
        },
        onError: () => {
        }
    })
}

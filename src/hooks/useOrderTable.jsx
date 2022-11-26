
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
        select: (data) => data.data
    })

}


export function useCreateOrder(tableId, data) {
    const queryClient = useQueryClient();
    function createOrder(data, tableId) {
        return () => api.post(`tables/${tableId}/orders`, data)
    }
    return useMutation(createOrder(data, tableId), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['table-order'] })

        },
        onError: () => {
        }
    })
}

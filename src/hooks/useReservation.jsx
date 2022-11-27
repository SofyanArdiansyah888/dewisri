import { useMutation, useQuery } from "react-query";
import api from "../services/api";

export function useReservation(onSuccess) {
  function fetchReservations() {
    return () => api.get(`reservations`);
  }
  return useQuery(["reservations"], fetchReservations(), {
    onSuccess,
    onError: () => {},
    select: (data) => {
      let temp = data.data
      return temp.map((result) => {
        if(result?.table){
          let tableName = result?.table?.map(table => table.name)
          result.table_name = tableName.toString();
        }else{
          result.table_name = ""
        }
        return result;
      })
      
    },
  });
}

export function useCreateReservation(onSuccess) {
  function createReservations(data) {
    return api.post(`reservations`, data);
  }
  return useMutation(createReservations, {
    onSuccess,
    onError: () => {},
  });
}

export function useUpdateReservation(userId, onSuccess) {
  function updateReservations(data) {
    return api.put(`reservations/${userId}`, data);
  }
  return useMutation(updateReservations, {
    onSuccess,
    onError: () => {},
  });
}

export function useCancelReservation(reservationId, onSuccess) {
  function cancelReservation(data) {
    return api.put(`reservations/${reservationId}/`,data);
  }
  return useMutation(cancelReservation, {
    onSuccess,
    onError: () => {},
  });
}

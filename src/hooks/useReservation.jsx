import { useMutation, useQuery } from "react-query";
import api from "../services/api";
import { useError } from "./useError";

export function useReservation(onSuccess) {
  const { setErrorMessage } = useError();
  function fetchReservations() {
    return () => api.get(`reservations`);
  }
  return useQuery(["reservations"], fetchReservations(), {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => {
      let temp = data.data;
      return temp.map((result) => {
        if (result?.table) {
          let tableName = result?.table?.map((table) => table.name);
          result.table_name = tableName.toString();
        } else {
          result.table_name = "";
        }
        return result;
      });
    },
  });
}

export function useCreateReservation(onSuccess) {
  const { setErrorMessage } = useError();

  function createReservations(data) {
    return api.post(`reservations`, data);
  }
  return useMutation(createReservations, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

export function useUpdateReservation(userId, onSuccess) {
  const { setErrorMessage } = useError();
  function updateReservations(data) {
    return api.put(`reservations/${userId}`, data);
  }
  return useMutation(updateReservations, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

export function useCancelReservation(reservationId, onSuccess) {
  const { setErrorMessage } = useError();
  function cancelReservation(data) {
    return api.put(`reservations/${reservationId}/`, data);
  }
  return useMutation(cancelReservation, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

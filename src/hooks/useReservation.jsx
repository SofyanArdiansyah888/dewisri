import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import { useError } from "./useError";
import { useSuccess } from "./useSuccess";

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

export function useCreateReservation(onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const queryClient = useQueryClient();

  function createReservations(data) {
    return api.post(`reservations`, data);
  }
  return useMutation(createReservations, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["reservations"]);
      setSuccessMessage("Berhasil Membuat Reservasi");
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

export function useUpdateReservation(userId, onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const queryClient = useQueryClient();

  function updateReservations(data) {
    return api.put(`reservations/${userId}`, data);
  }
  return useMutation(updateReservations, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["reservations"]);
      setSuccessMessage("Berhasil Mengupdate Reservasi");
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

export function useCancelReservation(reservationId, onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const queryClient = useQueryClient();
  function cancelReservation(data) {
    return api.put(`reservations/${reservationId}/`, data);
  }
  return useMutation(cancelReservation, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["reservations"]);
      setSuccessMessage("Berhasil Mencancel Reservasi");
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

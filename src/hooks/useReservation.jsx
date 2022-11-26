import { useMutation, useQuery } from "react-query";
import api from "../services/api";

export function useReservation(onSuccess) {
  function fetchReservations() {
    return () => api.get(`reservations`);
  }
  return useQuery(["reservations"], fetchReservations(), {
    onSuccess,
    onError: () => {},
    select: (data) => data.data,
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

export function useDeleteReservation(userId, onSuccess) {
  function deleteReservations() {
    return api.delete(`reservations/${userId}`);
  }
  return useMutation(deleteReservations, {
    onSuccess,
    onError: () => {},
  });
}

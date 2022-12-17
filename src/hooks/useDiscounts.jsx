import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import { useError } from "./useError";
import { useSuccess } from "./useSuccess";

export function useDiscounts() {
  const { setErrorMessage } = useError();
  function fetchDiscounts() {
    return api.get(`discounts`);
  }
  return useQuery(["discounts"], fetchDiscounts, {
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => {
      if (data.data) {
        return data?.data;
      }
    },
  });
}

export function useUpdateDiscount(discountId, onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const query = useQueryClient();
  function updateDiscount(data) {
    return api.put(`discounts/${discountId}`, data);
  }
  return useMutation(updateDiscount, {
    onSuccess: (data) => {
      query.invalidateQueries({ queryKey: ["discounts"] });
      setSuccessMessage("Berhasil Mengupdate Diskon");
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

export function useCreateDiscount(onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const query = useQueryClient();
  function updateDiscount(data) {
    return api.post(`discounts`, data);
  }
  return useMutation(updateDiscount, {
    onSuccess: (data) => {
      query.invalidateQueries({ queryKey: ["discounts"] });
      setSuccessMessage("Berhasil Membuat Diskon");
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

export function useDeleteDiscount(discountId, onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const query = useQueryClient();
  function deleteDiscount() {
    return api.delete(`discounts/${discountId}`);
  }
  return useMutation(deleteDiscount, {
    onSuccess: (data) => {
      query.invalidateQueries({ queryKey: ["discounts"] });
      setSuccessMessage("Berhasil Menghapus Diskon");
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

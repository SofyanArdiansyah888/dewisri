import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import { useError } from "./useError";
import { useSuccess } from "./useSuccess";

export function useProducts(onSuccess) {
  const { setErrorMessage } = useError();
  function fetchProducts() {
    return () => api.get(`products`);
  }
  return useQuery(["products"], fetchProducts(), {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => {
      let products = data?.data;
      return products.map((product) => {
        if (product?.materials?.length == 0) {
          product.available = true;
        } else {
          product.materials.sort((a, b) => a?.stock - b?.stock);
          if (product.materials[0]?.stock > 0) {
            product.available = true;
          } else {
            product.available = false;
          }
        }
        return product;
      });
    },
  });
}

export function useProduct(productId, onSuccess) {
  const { setErrorMessage } = useError();
  function fetchProduct({ queryKey }) {
    const [_, productId] = queryKey;
    return api.get(`products/${productId}`);
  }
  return useQuery([`product`, productId], fetchProduct, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => {
      let materials = data?.data?.materials?.map((material) => {
        material.quantity = material.pivot.quantity;
        return material;
      });
      let temp = data.data;
      return {
        ...temp,
        materials,
      };
    },
  });
}

export function useCreateProduct(onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const queryClient = useQueryClient();

  function createdProduct(data) {
    return api.post(`products`, data);
  }
  return useMutation(createdProduct, {
    onSuccess: (data) => {
      if (onSuccessCallback) onSuccessCallback(data);
      setSuccessMessage("Berhasil Membuat Produk");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

export function useUpdateProduct(onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const queryClient = useQueryClient();

  function updatedProduct({ data, productId }) {
    return api.put(`products/${productId}`, data);
  }
  return useMutation(updatedProduct, {
    onSuccess: (data) => {
      if (onSuccessCallback) onSuccessCallback(data);
      setSuccessMessage("Berhasil Mengupdate Produk");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

export function useDeleteProduct(userId, onSuccessCallback) {
  const { setErrorMessage } = useError();
  const { setSuccessMessage } = useSuccess();
  const queryClient = useQueryClient();
  function deletedProduct() {
    return api.delete(`products/${userId}`);
  }
  return useMutation(deletedProduct, {
    onSuccess: (data) => {
      if (onSuccessCallback) onSuccessCallback(data);
      setSuccessMessage("Berhasil Menghapus Produk");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

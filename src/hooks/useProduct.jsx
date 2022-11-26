import { useMutation, useQuery } from "react-query";
import api from "../services/api";

export function useProducts(onSuccess) {
  function fetchProduct() {
    return () => api.get(`products`);
  }
  return useQuery(["products"], fetchProduct(), {
    onSuccess,
    onError: () => {},
    select: (data) => {
      
      return data?.data?.map((temp) => {

          let variants = temp?.variants?.map((variant) => variant.name)
       
          temp.variant_names = variants.toString();
          
          return temp
      })
    },
  });
}

export function useProduct(productId,onSuccess) {
  function fetchProduct({queryKey}) {
    const [_, productId] = queryKey
    return api.get(`products/${productId}`);
  }
  return useQuery([`product`,productId], fetchProduct, {
    onSuccess,
    onError: () => {},
    select: (data) => {
      let materials = data?.data?.materials?.map((material) => {
        material.quantity = material.pivot.quantity;
        return material
      })
      let temp = data.data
      return {
        ...temp,
        materials
      }
    },
  });
}

export function useCreateProduct(onSuccess) {
  function createdProduct(data) {
    return api.post(`products`, data);
  }
  return useMutation(createdProduct, {
    onSuccess,
    onError: () => {},
  });
}

export function useUpdateProduct( onSuccess) {
  function updatedProduct({data, userId}) {
    return api.put(`products/${userId}`, data);
  }
  return useMutation(updatedProduct, {
    onSuccess,
    onError: () => {},
  });
}

export function useDeleteProduct(userId, onSuccess) {
  function deletedProduct() {
    return api.delete(`products/${userId}`);
  }
  return useMutation(deletedProduct, {
    onSuccess,
    onError: () => {},
  });
}

import { useMutation, useQuery } from "react-query";
import api from "../services/api";
import { useError } from "./useError";


export function useProducts(onSuccess) {
  const { setErrorMessage } = useError();
  function fetchProducts() {
      return () => api.get(`products`);
  }
  return useQuery(['products'], fetchProducts(), {
      onSuccess,
      onError: (error) => {
        setErrorMessage(error.message);
      },
      select: (data) => {
         let products =  data?.data
         return products.map((product) => {
          if(product?.materials?.length == 0){
              product.available = true;
          }else{
              product.materials.sort(( a, b ) =>  a?.stock - b?.stock )
              if(product.materials[0]?.stock > 0){
                  product.available = true;
              }else{
                  product.available = false;
              }
          }
          return product
         })
      }
  })

}

export function useProduct(productId,onSuccess) {
  const { setErrorMessage } = useError();
  function fetchProduct({queryKey}) {
    const [_, productId] = queryKey
    return api.get(`products/${productId}`);
  }
  return useQuery([`product`,productId], fetchProduct, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
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
  const { setErrorMessage } = useError();
  function createdProduct(data) {
    return api.post(`products`, data);
  }
  return useMutation(createdProduct, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

export function useUpdateProduct( onSuccess) {
  const { setErrorMessage } = useError();
  function updatedProduct({data, productId}) {
    return api.put(`products/${productId}`, data);
  }
  return useMutation(updatedProduct, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

export function useDeleteProduct(userId, onSuccess) {
  const { setErrorMessage } = useError();
  function deletedProduct() {
    return api.delete(`products/${userId}`);
  }
  return useMutation(deletedProduct, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
}

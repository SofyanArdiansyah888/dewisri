import { useQuery } from "react-query";
import api from "../services/api";
import { useError } from "./useError";

export function useLaporanPenjualan(data,onSuccess) {
  const { setErrorMessage } = useError();
  function fetchLaporan() {
    const {date, type} = data
    return  api.get(`laporan-penjualan?date=${date}&type=${type}`);
  }
  return useQuery(["laporan-penjualan"], fetchLaporan, {
    onSuccess,
    onError: (error) => {
      setErrorMessage(error.message);
    },
    select: (data) => data,
  });
}

export function useLaporanProduk(data,onSuccess) {
    const { setErrorMessage } = useError();
    function fetchLaporan() {
      const {date, type} = data
      return  api.get(`laporan-produk?date=${date}&type=${type}`);
    }
    return useQuery(["laporan-produk"], fetchLaporan, {
      onSuccess,
      onError: (error) => {
        setErrorMessage(error.message);
      },
      select: (data) => data,
    });
  }


  export function useLaporanKategori(data,onSuccess) {
    const { setErrorMessage } = useError();
    function fetchLaporan() {
      const {date, type} = data
      return  api.get(`laporan-kategori?date=${date}&type=${type}`);
    }
    return useQuery(["laporan-kategori"], fetchLaporan, {
      onSuccess,
      onError: (error) => {
        setErrorMessage(error.message);
      },
      select: (data) => data,
    });
  }


  export function useLaporanPajak(data,onSuccess) {
    const { setErrorMessage } = useError();
    function fetchLaporan() {
      const {date, type} = data
      return  api.get(`laporan-pajak?date=${date}&type=${type}`);
    }
    return useQuery(["laporan-pajak"], fetchLaporan, {
      onSuccess,
      onError: (error) => {
        setErrorMessage(error.message);
      },
      select: (data) => data,
    });
  }

  export function useLaporanPelanggan(data,onSuccess) {
    const { setErrorMessage } = useError();
    function fetchLaporan() {
      const {date, type} = data
      return  api.get(`laporan-pelanggan?date=${date}&type=${type}`);
    }
    return useQuery(["laporan-pelanggan"], fetchLaporan, {
      onSuccess,
      onError: (error) => {
        setErrorMessage(error.message);
      },
      select: (data) => data,
    });
  }
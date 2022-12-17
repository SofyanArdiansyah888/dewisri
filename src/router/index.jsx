import { useLocation, useRoutes } from "react-router-dom";
import SideMenu from "../layouts/side-menu/Main";
import Login from "../views/auth/login/Main";
import Register from "../views/auth/register/Main";
import Dashboard from "../views/beranda/Main";
import ErrorPage from "../views/errors/Main";
import PointOfSale from "../views/pos/Main";

// PRODUCT
import LaporanPenjualan from "../views/laporan/ringkasan-penjualan/RingkasanPenjualan";
import LaporanPenjualanShift from "../views/laporan/shift/RingkasanPenjualan";
import ListBahanBaku from "../views/produk/bahan-baku/List";
import ListBahanPendukung from "../views/produk/bahan-pendukung/List";
import ListKategori from "../views/produk/kategori/List";
import CreateProduk from "../views/produk/produk/Create/Index";
import UpdateProduk from "../views/produk/produk/Update/Index";

import ListProduk from "../views/produk/produk/List";
import { Navigate } from "react-router-dom";
// USER
import UserList from "../views/user/List";

// LAPORAN
import Pelanggan from "../views/laporan/laporan-pelanggan/Pelanggan";
import PenjualanPerProduk from "../views/laporan/laporan-produk/PenjualanPerProduk";
import PenjualanPerKategori from "../views/laporan/laporan-kategori/PenjualanPerKategori";

import RiwayatTransaksi from "../views/riwayat-transaksi/RiwayatTransaksi";

// INVENTARIS
import DaftarStok from "../views/inventaris/daftar-stok/List";
import CreateStokMasuk from "../views/inventaris/stok-masuk/Create";
import StokMasuk from "../views/inventaris/stok-masuk/List";
import DetailStokMasuk from "../views/inventaris/stok-masuk/Detail";
import CreateStokOpname from "../views/inventaris/stok-opname/Create";
import StokOpname from "../views/inventaris/stok-opname/List";
import DetailStokOpname from "../views/inventaris/stok-opname/Detail";
import CreateStokWasted from "../views/inventaris/stok-wasted/Create";
import DetailStokWasted from "../views/inventaris/stok-wasted/Detail";
import StokWasted from "../views/inventaris/stok-wasted/List";

// MEJA
import ListMeja from "../views/meja/List";
import ListPajak from "../views/pajak/List";
import ListDiskon from "../views/discount/List";

// Pelanggan
import CustomerList from "../views/pelanggan/List";

// Printer
import ListPrinter from "../views/printer/List";
import CreateReservation from "../views/meja/reservasi/Create";
import ListReservation from "../views/meja/reservasi/List";
import RequireAuth from "../components/RequireAuth";
import { useAuth } from "../hooks/useAuth";
import TransferOrder from "../views/pos/TransferOrder";
import Payment from "../views/pos/Payment";
import PaymentReceipt from "../views/pos/PaymentReceipt";
import SplitBill from "../views/pos/SplitBill";
import LaporanPajak from "../views/laporan/pajak/Pajak";

function Router() {
  const auth = useAuth();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";

  const routes = [
    {
      path: "/",
      element: (
        <RequireAuth>
          <SideMenu />
        </RequireAuth>
      ),
      children: [
        // BERANDA
        {
          path: "/",
          element: (
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          ),
        },
        {
          path: "/beranda",
          element: (
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          ),
        },
        // USER
        {
          path: "/user",
          element: (
            <RequireAuth>
              <UserList />
            </RequireAuth>
          ),
        },
        // LAPORAN
        {
          path: "laporan/laporan-penjualan",
          element: (
            <RequireAuth>
              <LaporanPenjualan />
            </RequireAuth>
          ),
        },
        {
          path: "laporan/laporan-penjualan-shift",
          element: (
            <RequireAuth>
              <LaporanPenjualanShift />
            </RequireAuth>
          ),
        },
        {
          path: "/laporan/penjualan-perproduk",
          element: (
            <RequireAuth>
              <PenjualanPerProduk />
            </RequireAuth>
          ),
        },
        {
          path: "/laporan/penjualan-perkategori",
          element: (
            <RequireAuth>
              <PenjualanPerKategori />
            </RequireAuth>
          ),
        },
        {
          path: "/laporan/pajak",
          element: (
            <RequireAuth>
              <LaporanPajak />
            </RequireAuth>
          ),
        },
        {
          path: "/laporan/pelanggan",
          element: (
            <RequireAuth>
              <Pelanggan />
            </RequireAuth>
          ),
        },

        // RIWAYAT TRANSAKSI
        {
          path: "/riwayat-transaksi",
          element: (
            <RequireAuth>
              <RiwayatTransaksi />
            </RequireAuth>
          ),
        },
        // PRODUK
        {
          path: "/produk/produk",
          element: (
            <RequireAuth>
              <ListProduk />
            </RequireAuth>
          ),
        },
        {
          path: "/produk/produk/create",
          element: (
            <RequireAuth>
              <CreateProduk />
            </RequireAuth>
          ),
        },
        {
          path: "/produk/produk/:id/update",
          element: (
            <RequireAuth>
              <UpdateProduk />
            </RequireAuth>
          ),
        },
        {
          path: "/produk/kategori",
          element: (
            <RequireAuth>
              <ListKategori />
            </RequireAuth>
          ),
        },
        {
          path: "/produk/bahan-baku",
          element: (
            <RequireAuth>
              <ListBahanBaku />
            </RequireAuth>
          ),
        },
        {
          path: "/produk/bahan-pendukung",
          element: (
            <RequireAuth>
              <ListBahanPendukung />
            </RequireAuth>
          ),
        },
        // INVENTARIS
        {
          path: "/inventori/stok-opname",
          element: (
            <RequireAuth>
              <StokOpname />
            </RequireAuth>
          ),
        },
        {
          path: "/inventori/stok-opname/create",
          element: (
            <RequireAuth>
              <CreateStokOpname />
            </RequireAuth>
          ),
        },
        {
          path: "/inventori/stok-opname/:id",
          element: (
            <RequireAuth>
              <DetailStokOpname />
            </RequireAuth>
          ),
        },

        {
          path: "/inventori/stok-wasted",
          element: (
            <RequireAuth>
              <StokWasted />
            </RequireAuth>
          ),
        },
        {
          path: "/inventori/stok-wasted/create",
          element: (
            <RequireAuth>
              <CreateStokWasted />
            </RequireAuth>
          ),
        },
        {
          path: "/inventori/stok-wasted/:id",
          element: (
            <RequireAuth>
              <DetailStokWasted />
            </RequireAuth>
          ),
        },

        {
          path: "/inventori/daftar-stok",
          element: (
            <RequireAuth>
              <DaftarStok />
            </RequireAuth>
          ),
        },

        {
          path: "/inventori/stok-masuk",
          element: (
            <RequireAuth>
              <StokMasuk />
            </RequireAuth>
          ),
        },

        {
          path: "/inventori/stok-masuk/:id",
          element: (
            <RequireAuth>
              <DetailStokMasuk />
            </RequireAuth>
          ),
        },

        {
          path: "/inventori/stok-masuk/create",
          element: (
            <RequireAuth>
              <CreateStokMasuk />
            </RequireAuth>
          ),
        },
        // PAJAK
        {
          path: "/pajak",
          element: (
            <RequireAuth>
              <ListPajak />
            </RequireAuth>
          ),
        },
        // PAJAK
        {
          path: "/diskon",
          element: (
            <RequireAuth>
              <ListDiskon />
            </RequireAuth>
          ),
        },
        // MEJA
        {
          path: "/meja",
          element: (
            <RequireAuth>
              <ListMeja />
            </RequireAuth>
          ),
        },
        {
          path: "/meja/:id/pos",
          element: (
            <RequireAuth>
              <PointOfSale />
            </RequireAuth>
          ),
        },
        {
          path: "/meja/:id/transfer-order",
          element: (
            <RequireAuth>
              <TransferOrder />
            </RequireAuth>
          ),
        },
        {
          path: "/reservasi/create",
          element: (
            <RequireAuth>
              <CreateReservation />
            </RequireAuth>
          ),
        },
        {
          path: "/reservasi",
          element: (
            <RequireAuth>
              <ListReservation />
            </RequireAuth>
          ),
        },
        {
          path: "/meja/:tableId/order/:orderId/payment",
          element: (
            <RequireAuth>
              <Payment />
            </RequireAuth>
          ),
        },
        {
          path: "/payment-receipt",
          element: (
            <RequireAuth>
              <PaymentReceipt />
            </RequireAuth>
          ),
        },
        {
          path: "/meja/:tableId/order/:orderId/split-bill",
          element: (
            <RequireAuth>
              <SplitBill />
            </RequireAuth>
          ),
        },
        // PELANGGAN
        {
          path: "/pelanggan",
          element: (
            <RequireAuth>
              <CustomerList />
            </RequireAuth>
          ),
        },
        // PRINTER
        {
          path: "/printer",
          element: (
            <RequireAuth>
              <ListPrinter />
            </RequireAuth>
          ),
        },
      ],
    },

    {
      path: "/login",
      element: auth.authUser ? <Navigate to={redirectPath} /> : <Login />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ];

  return useRoutes(routes);
}

export default Router;

import { atom } from "recoil";
import { getUser } from "../services/database";

const adminMenu = [
  // BERANDA
  {
    icon: "Home",
    pathname: "/beranda",
    title: "Beranda",
  },
  // USER
  {
    icon: "Users",
    pathname: "/user",
    title: "User",
  },
  // PRODUK
  {
    icon: "HardDrive",
    title: "Produk",
    subMenu: [
      {
        pathname: "/produk/kategori",
        title: "Kategori",
      },

      {
        pathname: "/produk/bahan-baku",
        title: "Bahan Baku",
      },
      {
        pathname: "/produk/produk",
        title: "Produk",
      },
      {
        pathname: "/produk/bahan-pendukung",
        title: "Bahan Pendukung",
      },
    ],
  },
  // INVENTARIS
  {
    icon: "Database",
    title: "Inventori",
    subMenu: [
      // {
      //   pathname: "/inventori/daftar-stok",
      //   title: "Daftar Stok",
      // },
      {
        pathname: "/inventori/stok-masuk",
        title: "Stok Masuk",
      },
      {
        pathname: "/inventori/stok-wasted",
        title: "Stok Terbuang",
      },
      {
        pathname: "/inventori/stok-opname",
        title: "Stok Opname",
      },
    ],
  },

  // REPORT
  {
    icon: "Clipboard",
    title: "Laporan",
    subMenu: [
      {
        pathname: "/laporan/ringkasan-penjualan",
        title: "Ringkasan penjualan",
      },
      {
        pathname: "/laporan/penjualan-perproduk",
        title: "Penjualan Per Produk",
      },
      {
        pathname: "/laporan/penjualan-perkategori",
        title: "Penjualan Per Kategori",
      },
      {
        pathname: "/laporan/pajak",
        title: "Laporan Pajak",
      },
      {
        pathname: "/laporan/pelanggan",
        title: "Laporan Pelanggan",
      },
      // {
      //   pathname: "/laporan/pegawai",
      //   title: "Laporan Pegawai",
      // },
      // {
      //   pathname: "/laporan/diskon",
      //   title: "Laporan Diskon",
      // },
    ],
  },
  // RIWAYAT TRANSAKSI
  // {
  //   icon: "Clock",
  //   pathname: "/riwayat-transaksi",
  //   title: "Riwayat Transaksi",
  // },
  // MEJA
  {
    icon: "Table",
    pathname: "/meja",
    title: "Meja",
  },
  // PAJAK
  {
    icon: "Coins",
    pathname: "/pajak",
    title: "Pajak",
  },
  // PELANGGAN
  {
    icon: "User",
    pathname: "/pelanggan",
    title: "Pelanggan",
  },
  // PRINTERS
  {
    icon: "Printer",
    pathname: "/printer",
    title: "Printer",
  },
];

const cashierMenu = [
  // BERANDA
  {
    icon: "Home",
    pathname: "/beranda",
    title: "Beranda",
  },
  // RIWAYAT TRANSAKSI
  {
    icon: "Clock",
    pathname: "/riwayat-transaksi",
    title: "Riwayat Transaksi",
  },
  // MEJA
  {
    icon: "Table",
    pathname: "/meja",
    title: "Meja",
  },
  // PAJAK
  {
    icon: "Coins",
    pathname: "/pajak",
    title: "Pajak",
  },
  // PELANGGAN
  {
    icon: "User",
    pathname: "/pelanggan",
    title: "Pelanggan",
  },
  // PRINTERS
  {
    icon: "Printer",
    pathname: "/printer",
    title: "Printer",
  },
];

const warehouseMenu = [
  // BERANDA
  {
    icon: "Home",
    pathname: "/beranda",
    title: "Beranda",
  },
  // INVENTARIS
  {
    icon: "Database",
    title: "Inventori",
    subMenu: [
      // {
      //   pathname: "/inventori/daftar-stok",
      //   title: "Daftar Stok",
      // },
      {
        pathname: "/inventori/stok-masuk",
        title: "Stok Masuk",
      },
      {
        pathname: "/inventori/stok-wasted",
        title: "Stok Terbuang",
      },
      {
        pathname: "/inventori/stok-opname",
        title: "Stok Opname",
      },
    ],
  },
];



export function checkMenu() {
  let user = getUser();
  if (user) {
    if (user.role === "ADMIN") return adminMenu;
    else if (user.role === "CASHIER") return cashierMenu;
    else if (user.role === "WAREHOUSE") return warehouseMenu;
    else return [];
  }
  return [];
}

const sideMenu = atom({
  key: "sideMenu",
  default: {
    menu: checkMenu(),
  },
});

export { sideMenu };

import { useEffect } from "react";
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
        pathname: "/laporan/laporan-penjualan",
        title: "Penjualan",
      },
      {
        pathname: "/laporan/laporan-penjualan-shift",
        title: "Penjualan Shift",
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
    ],
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
  // DISKON
  {
    icon: "Coins",
    pathname: "/diskon",
    title: "Diskon",
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
  {
    icon: "Clipboard",
    title: "Laporan",
    subMenu: [
      {
        pathname: "/laporan/laporan-penjualan",
        title: "Penjualan",
      },
      {
        pathname: "/laporan/laporan-penjualan-shift",
        title: "Penjualan Shift",
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
    ],
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
  // DISKON
  {
    icon: "Coins",
    pathname: "/diskon",
    title: "Diskon",
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

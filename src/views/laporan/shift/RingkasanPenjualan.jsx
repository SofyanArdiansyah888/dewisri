import { Litepicker, Lucide } from "@/base-components";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import EmptyData from "../../../components/EmptyData";

import { useExportLaporanPenjualanShift, useLaporanPenjualanShift, usePrintLaporanPenjualanShift } from "../../../hooks/useLaporanPenjualanShift";
import GroupTable from "./GroupTable";

import Table from "./Table";
function RingkasanPenjualan() {
  const [date, setDate] = useState();
  const [type, setType] = useState("harian");
  const queryClient = useQueryClient();
  const { data: laporanPenjualan, refetch } = useLaporanPenjualanShift({
    date,
    type,
  });

  const { mutate: exportLaporan } = useExportLaporanPenjualanShift((data) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Laporan Penjualan Shift ${date}.xlsx`);
    document.body.appendChild(link);
    link.click();
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["laporan-penjualan"] });
    refetch();
    return () => refetch;
  }, [type, date]);

  const {mutate: printLaporan} = usePrintLaporanPenjualanShift()
  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">
        Laporan Ringkasan Penjualan
      </h2>

      <div className="flex flex-col gap-2 mt-5">
        <div className="intro-y flex flex-wrap sm:flex-nowrap justify-between mt-2">
          <div>
            <button
              className="btn btn-primary shadow-md mr-2"
              onClick={() => {
                exportLaporan({
                  date,
                  type,
                });
              }}
            >
              <span className="w-5 h-5 mr-2 flex items-center justify-center">
                <Lucide icon="Printer" className="w-4 h-4" />
              </span>
              Export Laporan
            </button>
          </div>

          <div className="intro-y block sm:flex items-center h-10">
            <div className="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
              <Lucide
                icon="Calendar"
                className="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0"
              />
              <Litepicker
                value={date}
                onChange={setDate}
                tipe={type}
                options={{
                  autoApply: false,
                  singleMode: false,
                  numberOfColumns: 2,
                  numberOfMonths: 2,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }}
                className="form-control sm:w-56 box pl-10 cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-row gap-2 justify-items-center justify-end">
            <div
              className={`box p-3 cursor-pointer ${
                type === "harian" ? "bg-yellow-100" : ""
              } `}
              onClick={() => setType("harian")}
            >
              Harian
            </div>
            <div
              className={`box p-3 cursor-pointer ${
                type === "mingguan" ? "bg-yellow-100" : ""
              } `}
              onClick={() => setType("mingguan")}
            >
              Mingguan
            </div>
            <div
              className={`box p-3 cursor-pointer ${
                type === "bulanan" ? "bg-yellow-100" : ""
              } `}
              onClick={() => setType("bulanan")}
            >
              Bulanan
            </div>
            <div
              className={`box p-3 cursor-pointer ${
                type === "tahunan" ? "bg-yellow-100" : ""
              } `}
              onClick={() => setType("tahunan")}
            >
              Tahunan
            </div>
          </div>
        </div>

        <div className="intro-y overflow-x-auto justify-center justify-items-center bg-white p-8 rounded-md  mt-2">
          {laporanPenjualan?.length === 0 || !laporanPenjualan ? (
            <EmptyData />
          ) : (
            <>
              {type === "harian" && (
                <Table laporanPenjualan={laporanPenjualan} printLaporan={printLaporan} />
              )}

              {type !== "harian" && (
                <GroupTable laporanPenjualan={laporanPenjualan} printLaporan={printLaporan} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default RingkasanPenjualan;

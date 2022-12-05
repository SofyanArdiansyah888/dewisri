import LineChart from "@/components/line-chart/Main";
import { Lucide, Litepicker } from "@/base-components";
import { Link } from "react-router-dom";
import PajakLineChart from "./PajakLineChart";
function Pajak() {
  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Laporan Pajak</h2>

      <div className="flex flex-col gap-2 mt-5">
        <div className="intro-y flex flex-wrap sm:flex-nowrap justify-between mt-2">
          <div>
            <button className="btn btn-primary shadow-md mr-2">
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
                // value={salesReportFilter}
                // onChange={setSalesReportFilter}
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
                className="form-control sm:w-56 box pl-10"
              />
            </div>
          </div>
        </div>


        <div className="intro-y w-full  justify-center justify-items-center bg-white p-8 rounded-md  mt-2">
        <div className="mb-8">
          <h1 className="text-xl">Grafik Pajak</h1>
          <div className="flex flex-row gap-2 justify-items-center justify-end">
            <div className="box p-3">Harian</div>
            <div className="box p-3">Mingguan</div>
            <div className="box p-3">Bulanan</div>
            <div className="box p-3">Tahunan</div>
          </div>
        </div>
          <PajakLineChart height={400}className="mt-4" />
        </div>
      </div>
    </>
  );
}

export default Pajak;

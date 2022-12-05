import {
  Dropdown, DropdownContent,
  DropdownItem, DropdownMenu, DropdownToggle, Litepicker, Lucide
} from "@/base-components";
import LaporanPelangganChart from "./LaporanPelangganChart";

function Pelanggan() {
  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">
        Laporan Penjualan Pelanggan
      </h2>

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
        </div>

        <div className="col-span-12 lg:col-span-6 mt-8">
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
          <div className="intro-y box p-5 mt-12 sm:mt-5">
            <h2 className="text-lg font-medium truncate mr-5">
              Grafik Laporan Pelanggan
            </h2>
            <div className="flex flex-col md:flex-row md:items-center mt-12">
              <div className="flex gap-2">
                <div className="box p-3">Harian</div>
                <div className="box p-3">Mingguan</div>
                <div className="box p-3">Bulanan</div>
                <div className="box p-3">Tahunan</div>
              </div>
              <Dropdown className="md:ml-auto mt-5 md:mt-0">
                <DropdownToggle className="btn btn-outline-secondary font-normal">
                  Filter by Pelanggan
                  <Lucide icon="ChevronDown" className="w-4 h-4 ml-2" />
                </DropdownToggle>
                <DropdownMenu className="w-40">
                  <DropdownContent className="overflow-y-auto h-32">
                    <DropdownItem>PC & Laptop</DropdownItem>
                    <DropdownItem>Smartphone</DropdownItem>
                    <DropdownItem>Electronic</DropdownItem>
                    <DropdownItem>Photography</DropdownItem>
                    <DropdownItem>Sport</DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="report-chart">
              <LaporanPelangganChart height={400} className="mt-4" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pelanggan;

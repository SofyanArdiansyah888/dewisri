import { Lucide } from "@/base-components";
import { pipe, pluck, sum } from "ramda";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useIncomingStocks } from "../../../hooks/useIncomingStock";

import { helper } from "../../../utils/helper";

function Main() {
  const [daterange, setDaterange] = useState("");
  const {data} = useIncomingStocks();
  const [search, setSearch] = useState('');
  
  const filterData = () => {
    return data?.filter((item) =>
      item.invoice_number.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  };

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Data Stok Masuk</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap justify-between mt-2">
          <div>
            <Link to="/inventori/stok-masuk/create">
              <button className="btn btn-primary shadow-md mr-2">
                <span className="w-5 h-5 flex items-center justify-center">
                  <Lucide icon="Plus" className="w-4 h-4" />
                </span>
                Tambah Stok
              </button>
            </Link>
          </div>
          <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
            {/* <Litepicker
              value={daterange}
              onChange={setDaterange}
              options={{
                autoApply: false,
                singleMode: false,
                numberOfColumns: 4,
                numberOfMonths: 2,
                showWeekNumbers: true,
                dropdowns: {
                  minYear: 1990,
                  maxYear: null,
                  months: true,
                  years: true,
                },
              }}
              className="form-control w-56 block mx-auto mb-4"
            /> */}
            <div className="w-56 relative text-slate-500">
              <input
                type="text"
                className="form-control w-56 box pr-10"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <Lucide
                icon="Search"
                className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
              />
            </div>
          </div>
        </div>
        {/* BEGIN: Data List */}
        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
          <table className="table table-report -mt-2">
            <thead>
              <tr>
                <th className="whitespace-nowrap">Tanggal</th>
                <th className="whitespace-nowrap">No Faktur</th>
                <th className="text-center whitespace-nowrap">Material</th>
                <th className="text-center whitespace-nowrap">Jumlah</th>
                <th className="text-center whitespace-nowrap">User</th>
                <th className="text-center whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filterData()?.map((stock, index) => (
                <tr key={index} className="intro-x">
                  <td>
                    <a>
                      {helper.formatDate(stock.incoming_date, "DD MMMM YYYY")}
                    </a>
                  </td>
                  <td>
                    <div className="text-slate-900 text-md  whitespace-nowrap mt-0.5">
                      {stock.invoice_number}
                    </div>
                  </td>
                  <td className="text-center">
                    {pluck("name")(stock.materials).toString()}
                  </td>
                  <td className="text-center">
                    {pipe(
                      pluck("pivot"),
                      pluck("stock"),
                      sum
                    )(stock.materials).toString()}
                  </td>
                  <td className="text-center">{stock.user}</td>
                  <td>
                    <Link to={`/inventori/stok-masuk/${stock.id}`}>
                      <a className="flex items-center mr-3">
                        <Lucide icon="Eye" className="w-4 h-4 mr-1" />{" "}
                        Detail
                      </a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* END: Data List */}
        {/* BEGIN: Pagination */}
        {/* <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
          <nav className="w-full sm:w-auto sm:mr-auto">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronLeft" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronRight" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronsRight" className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </nav>
          <select className="w-20 form-select box mt-3 sm:mt-0">
            <option>10</option>
            <option>25</option>
            <option>35</option>
            <option>50</option>
          </select>
        </div> */}
        {/* END: Pagination */}
      </div>
    </>
  );
}

export default Main;

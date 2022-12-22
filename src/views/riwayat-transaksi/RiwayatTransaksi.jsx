import { Litepicker, Lucide } from "@/base-components";
import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import classnames from "classnames";
import { useState } from "react";
import { usePayments } from "../../hooks/usePayments";
import { useEffect } from "react";
import { formatRupiah } from "../../utils/formatter";
import { helper } from "../../utils/helper";
import { usePrintPayment } from "../../hooks/usePrintBill";
import EmptyData from "../../components/EmptyData";
import { useQueryClient } from "react-query";

function RiwayatTransaksi() {
  const [date, setDate] = useState();
  const [type, setType] = useState("harian");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [payments, setPayments] = useState([]);
  const queryClient = useQueryClient();

  const { refetch } = usePayments(
    (data) => {
      let lastPage = data.meta.last_page;
      setPages([]);
      for (let i = 1; i <= lastPage; i++) {
        setPages((pages) => [...pages, i]);
      }
      setPayments(data?.data);
    },
    { page, date }
  );

  const { mutate: printPayment } = usePrintPayment();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["payments"] });
    refetch();
    return () => {
      refetch;
    };
  }, [page,date]);

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Transaction List</h2>
      <div className="flex flex-col gap-2 mt-5">
        <div className="intro-y flex flex-wrap sm:flex-nowrap justify-between mt-2">
          <div>
            {/* <button
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
            </button> */}
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

            {/* <div className="w-full sm:w-auto relative ml-3 mt-3 sm:mt-0">
              <Lucide
                icon="Search"
                className="w-4 h-4 absolute my-auto inset-y-0 ml-3 left-0 z-10 text-slate-500"
              />
              <input
                type="text"
                className="form-control w-full sm:w-64 box px-10"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div> */}
          </div>
        </div>

        <div className="intro-y col-span-12 overflow-auto  mt-2">
          {payments?.length === 0 || !payments ? (
            <EmptyData />
          ) : (
            <>
              <table className="table table-report -mt-2 ">
                <thead>
                  <tr>
                    <th className="text-center whitespace-nowrap">ACTIONS</th>
                    <th className="whitespace-nowrap">Payment Number</th>
                    <th className="whitespace-nowrap">Meja</th>
                    <th className="whitespace-nowrap">Customer Name</th>
                    <th className="whitespace-nowrap">Subtotal</th>
                    <th className="whitespace-nowrap">Tax PPN</th>
                    <th className="whitespace-nowrap">Tax Service</th>
                    <th className="whitespace-nowrap">Discount</th>
                    <th className="whitespace-nowrap">Total</th>
                    <th className="whitespace-nowrap">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((item, key) => (
                    <tr key={key} className="intro-x">
                      <td className=" w-56">
                        <div className="flex justify-center items-center">
                          <div
                            className="flex items-center mr-3 cursor-pointer"
                            onClick={() =>
                              printPayment({ payment_id: item.id })
                            }
                          >
                            <Lucide
                              icon="CheckSquare"
                              className="w-4 h-4 mr-1"
                            />{" "}
                            Print
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="font-medium whitespace-nowrap">
                          {item.payment_number}
                        </div>
                      </td>
                      <td>
                        <div className="font-medium whitespace-nowrap">
                          {item.table_name}
                        </div>
                      </td>
                      <td>
                        <div className="font-medium whitespace-nowrap">
                          {item.customer_name}
                        </div>
                      </td>
                      <td>
                        <div className="font-medium whitespace-nowrap">
                          {formatRupiah(item.subtotal, "Rp.")}
                        </div>
                      </td>
                      <td>
                        <div className="font-medium whitespace-nowrap">
                          {formatRupiah(
                            (item.tax_ppn / 100) * item.subtotal,
                            "Rp."
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="font-medium whitespace-nowrap">
                          {formatRupiah(
                            (item.tax_service / 100) * item.subtotal,
                            "Rp."
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="font-medium whitespace-nowrap">
                          {formatRupiah(
                            (item.discount / 100) * item.subtotal,
                            "Rp."
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="font-medium whitespace-nowrap">
                          {formatRupiah(item.total, "Rp.")}
                        </div>
                      </td>
                      <td>
                        <div className="font-medium whitespace-nowrap">
                          {helper.formatDate(item.created_at, "D MMM YYYY")}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>

        {/* BEGIN: Pagination */}
        {pages.length > 10 && (
          <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
            <nav className="w-full sm:w-auto sm:mr-auto">
              <ul className="pagination">
                {/* <li className="page-item">
                  <a className="page-link" href="#">
                    <Lucide icon="ChevronLeft" className="w-4 h-4" />
                  </a>
                </li> */}

                {pages.map((tempPage) => (
                  <li className="page-item">
                    <div
                      className={`page-link ${
                        tempPage === page ? "bg-yellow-100" : ""
                      }`}
                      onClick={() => setPage(tempPage)}
                    >
                      {tempPage}
                    </div>
                  </li>
                ))}

                {/* <li className="page-item">
                  <a className="page-link" href="#">
                    <Lucide icon="ChevronRight" className="w-4 h-4" />
                  </a>
                </li> */}
              </ul>
            </nav>
          </div>
        )}
        {/* END: Pagination */}
      </div>
    </>
  );
}

export default RiwayatTransaksi;

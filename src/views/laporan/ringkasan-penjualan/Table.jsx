import { Litepicker, Lucide } from "@/base-components";
import { helper } from "../../../utils/helper";
import { formatRupiah } from "../../../utils/formatter";

export default function Table({ laporanPenjualan, printLaporan }) {
  return (
    <table className="table table-report -mt-2 ">
      <thead>
        <tr>
          <th className="text-center whitespace-nowrap">ACTIONS</th>
          <th className="whitespace-nowrap">Tanggal</th>
          <th className="whitespace-nowrap">Opening Cash</th>
          <th className="whitespace-nowrap">Item Sales</th>
          <th className="whitespace-nowrap">Bill Discount</th>
          <th className="whitespace-nowrap">Total Sales</th>
          <th className="whitespace-nowrap">Total Cash</th>
          <th className="whitespace-nowrap">Total Debit</th>
          <th className="whitespace-nowrap">Void</th>
          <th className="whitespace-nowrap">Net Sales</th>
          <th className="whitespace-nowrap">Tax PPN</th>
          <th className="whitespace-nowrap">Tax Service</th>
          <th className="whitespace-nowrap">Cash In Drawer</th>
          <th className="whitespace-nowrap">Total Bill</th>
          <th className="whitespace-nowrap">Average Bill</th>
        </tr>
      </thead>
      <tbody>
        {laporanPenjualan?.map((item, key) => (
          <tr key={key} className="intro-x">
            {/* ACTION BUTTONS */}
            <td className=" w-56">
              <div className="flex justify-center items-center">
                <div
                  className="flex items-center mr-3 cursor-pointer"
                  onClick={() => {
                    printLaporan({
                      date: item.date,
                    });
                  }}
                >
                  <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" /> Print
                </div>
              </div>
            </td>
            <td>
              <div className="font-medium whitespace-nowrap">
                {helper.formatDate(item.date, "DD MMM YYYY")}
              </div>
            </td>
            <td>
              <div className="font-medium whitespace-nowrap">
                {formatRupiah(item.opening_cash, "Rp.")}
              </div>
            </td>

            <td>
              <div className="font-medium whitespace-nowrap">
                {formatRupiah(item.item_sales, "Rp.")}
              </div>
            </td>

            <td>
              <div className="font-medium whitespace-nowrap">
                {formatRupiah(item.bill_disount, "Rp.")}
              </div>
            </td>

            <td>
              <div className="font-medium whitespace-nowrap">
                {formatRupiah(item.total_sales, "Rp.")}
              </div>
            </td>

            <td>
              <div className="font-medium whitespace-nowrap">
                {formatRupiah(item.total_cash, "Rp.")}
              </div>
            </td>

            <td>
              <div className="font-medium whitespace-nowrap">
                {formatRupiah(item.total_debit, "Rp.")}
              </div>
            </td>

            <td>
              <div className="font-medium whitespace-nowrap">
                {formatRupiah(item.send_void, "Rp.")}
              </div>
            </td>

            <td>
              <div className="font-medium whitespace-nowrap">
                {formatRupiah(item.nett_sales, "Rp.")}
              </div>
            </td>

            <td>
              <div className="font-medium whitespace-nowrap">
                {formatRupiah(item.tax_ppn, "Rp.")}
              </div>
            </td>

            <td>
              <div className="font-medium whitespace-nowrap">
                {formatRupiah(item.tax_service, "Rp.")}
              </div>
            </td>

            <td>
              <div className="font-medium whitespace-nowrap">
                {formatRupiah(item.cash_in_drawer, "Rp.")}
              </div>
            </td>

            <td>
              <div className="font-medium whitespace-nowrap">
                {item.total_bill}
              </div>
            </td>

            <td>
              <div className="font-medium whitespace-nowrap">
                {formatRupiah(item.average_bill, "Rp.")}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

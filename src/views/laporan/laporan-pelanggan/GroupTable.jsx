import { Litepicker, Lucide } from "@/base-components";
import { formatRupiah } from "../../../utils/formatter";
import { helper } from "../../../utils/helper";

export default function GroupTable({ laporanPenjualan }) {
  return (
    <table className="table -mt-2">
      <thead>
        <tr>
        <th className="whitespace-nowrap">Tanggal</th>
          <th className="whitespace-nowrap">Nama Customer</th>
          <th className="whitespace-nowrap">Total Spend</th>
          <th className="whitespace-nowrap">Total Kunjungan</th>
        </tr>
      </thead>
      <tbody>
        {laporanPenjualan?.map((items, groupKey) => (
          <>
            <tr key={groupKey}>
              <td colSpan={100} className="bg-slate-200 text-md font-semibold">
                {items.name}
              </td>
            </tr>
            {items?.data?.map((item, key) => (
              <tr key={key} className="intro-x">
                <td>
                  <div className="font-medium whitespace-nowrap">
                    {helper.formatDate(item.date, "DD MMM YYYY")}
                  </div>
                </td>
                <td>
                  <div className="font-medium whitespace-nowrap">
                    {item.name}
                  </div>
                </td>
                <td>
                  <div className="font-medium whitespace-nowrap">
                    {formatRupiah(item.total_spend, "Rp.")}
                  </div>
                </td>

                <td>
                  <div className="font-medium whitespace-nowrap">
                    {item.total_visit}
                  </div>
                </td>
              </tr>
            ))}
          </>
        ))}
      </tbody>
    </table>
  );
}

import { formatRupiah } from "../../../utils/formatter";
import { helper } from "../../../utils/helper";

export default function Table({ laporanPenjualan }) {
  return (
    <table className="table table-report -mt-2 ">
      <thead>
        <tr>
          <th className="whitespace-nowrap">Tanggal</th>
          <th className="whitespace-nowrap">Nama Customer</th>
          <th className="whitespace-nowrap">Total Spend</th>
          <th className="whitespace-nowrap">Total Kunjungan</th>
        </tr>
      </thead>
      <tbody>
        {laporanPenjualan?.map((item, key) => (
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
      </tbody>
    </table>
  );
}

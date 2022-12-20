import { formatRupiah } from "../../../utils/formatter";
import { helper } from "../../../utils/helper";

export default function Table({ laporanPenjualan }) {
  return (
    <table className="table table-report -mt-2 ">
      <thead>
        <tr>
          <th className="whitespace-nowrap">Tanggal</th>
          <th className="whitespace-nowrap">Tax Service</th>
          <th className="whitespace-nowrap">Tax PPN</th>
        </tr>
      </thead>
      <tbody>
        {laporanPenjualan?.map((item, key) => (
          <tr key={key} className="intro-x">
            
          
            <td>
              <div className="font-medium whitespace-nowrap">
                {helper.formatDate(item.created_at, "DD MMM YYYY")}
              </div>
            </td>
            <td>
              <div className="font-medium whitespace-nowrap">
                {formatRupiah(((item.tax_service/100) * item.subtotal), "Rp.")}
              </div>
            </td>
            <td>
              <div className="font-medium whitespace-nowrap">
                {formatRupiah((item.tax_ppn/100) * item.subtotal, "Rp.")}
              </div>
            </td>

        



          </tr>
        ))}
      </tbody>
    </table>
  );
}

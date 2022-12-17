import { formatRupiah } from "../../../utils/formatter";
import { helper } from "../../../utils/helper";

export default function Table({ laporanPenjualan }) {
  return (
    <table className="table table-report -mt-2 ">
      <thead>
        <tr>
          <th className="whitespace-nowrap">Tanggal</th>
          <th className="whitespace-nowrap">Produk</th>
          <th className="whitespace-nowrap">Harga</th>
          <th className="whitespace-nowrap">Quantity</th>
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
                {item.product_name}
              </div>
            </td>
            <td>
              <div className="font-medium whitespace-nowrap">
                {formatRupiah(item.item_price, "Rp.")}
              </div>
            </td>

        

            <td>
              <div className="font-medium whitespace-nowrap">
                {item.quantity}
              </div>
            </td>


          </tr>
        ))}
      </tbody>
    </table>
  );
}

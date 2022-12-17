import { Litepicker, Lucide } from "@/base-components";
import { formatRupiah } from "../../../utils/formatter";
import { helper } from "../../../utils/helper";

export default function GroupTable({ laporanPenjualan }) {
  return (
    <table className="table -mt-2">
      <thead>
        <tr>
          <th className="whitespace-nowrap">Tanggal</th>
          <th className="whitespace-nowrap">Produk</th>
          <th className="whitespace-nowrap">Harga</th>
          <th className="whitespace-nowrap">Quantity</th>
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
          </>
        ))}
      </tbody>
    </table>
  );
}

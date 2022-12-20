import { Litepicker, Lucide } from "@/base-components";
import { formatRupiah } from "../../../utils/formatter";
import { helper } from "../../../utils/helper";

export default function GroupTable({ laporanPenjualan }) {
  return (
    <table className="table -mt-2">
      <thead>
        <tr>
        <th className="whitespace-nowrap">Tanggal</th>
          <th className="whitespace-nowrap">Tax Service</th>
          <th className="whitespace-nowrap">Tax PPN</th>
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
          </>
        ))}
      </tbody>
    </table>
  );
}

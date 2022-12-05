import { Lucide } from "@/base-components";
import { helper } from "../../utils/helper";
function CustomerInfo({ customer, order, setModalCustomer }) {
  return (
    <>
      <div className="box p-5">
        <div className="flex items-center border-b border-slate-200 dark:border-darkmode-400 py-5">
          <div>
            <div className="text-slate-500">Customer</div>
            <div className="mt-2 capitalize">{customer?.name}</div>
          </div>
          <Lucide icon="Edit" className="w-4 h-4 text-slate-500 ml-auto" onClick={() => setModalCustomer(true)} />
        </div>

        {order?.table && (
          <div className="flex items-center pt-5">
            <div>
              <div className="text-slate-500">Meja</div>
              <div className="mt-2">{order?.table?.name}</div>
            </div>
            {/* <Lucide icon="Mic" className="w-4 h-4 text-slate-500 ml-auto" /> */}
          </div>
        )}
      </div>
    </>
  );
}

export default CustomerInfo;

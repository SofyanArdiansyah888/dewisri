import {
    Lucide
} from "@/base-components";
import { helper } from "../../utils/helper";
function CustomerInfo({order}) {
 
    return (
      <>
       <div className="box p-5">
            <div className="flex items-center border-b border-slate-200 dark:border-darkmode-400 pb-5">
              <div>
                <div className="text-slate-500">Tanggal</div>
                <div className="mt-1">{helper.formatDate(order?.created_at,'DD MMM YYYY hh:mm:ss')}</div>
              </div>
              <Lucide icon="Clock" className="w-4 h-4 text-slate-500 ml-auto" />
            </div>
            <div className="flex items-center border-b border-slate-200 dark:border-darkmode-400 py-5">
              <div>
                <div className="text-slate-500">Customer</div>
                <div className="mt-1">{order?.customer?.name}</div>
              </div>
              <Lucide icon="User" className="w-4 h-4 text-slate-500 ml-auto" />
            </div>
           
            <div className="flex items-center pt-5">
              <div>
                <div className="text-slate-500">Meja</div>
                <div className="mt-1">{order?.table?.name}</div>
              </div>
              <Lucide icon="Mic" className="w-4 h-4 text-slate-500 ml-auto" />
            </div>
          </div>
      </>
    );
  }
  
  export default CustomerInfo;
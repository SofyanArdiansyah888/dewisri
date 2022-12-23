import { Alert, Lucide, Litepicker } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useCreateWastedStock, useWastedStock } from "../../../hooks/useWastedStock";
import { formatRupiah } from "../../../utils/formatter";
import { helper } from "../../../utils/helper";
import MaterialModal from "../MaterialModal";
import MaterialSupportModal from "../MaterialSupportModal";
const schema = yup.object({
  // wasted_number: yup.string().required(),
  description: yup.string().required(),
});
const additionalAppend = {
  capital: 0,
  system_stock: 0,
  wasted_stock: 0,
  description: "",
};
function Detail() {
  const [date, setDate] = useState("");
  let {id} = useParams();
  const {data} = useWastedStock(id)

  useEffect(() => {
    if(data)
    setDate(data.wasted_date)
  },[data])

  

  return (
    <>
      <div>
        <div className="intro-y flex items-center mt-8">
          <h2 className="text-lg font-medium mr-auto">Tambah Stok Terbuang</h2>
        </div>
        <form className="validate-form" >
          <div className="grid grid-cols-12 gap-6 mt-5">
            <div className="intro-y col-span-12 lg:col-span-4">
              {/* BEGIN: Form Layout */}
              <div className="intro-y box p-5">
                <div>
                  <label htmlFor="crud-form-1" className="form-label">
                    Nomor
                  </label>
                  <input
                    id="crud-form-1"
                    type="text"
                    className="form-control w-full"
                    readOnly
                    value={data?.wasted_number}
                  />
                </div>
                <div className="col-span-12 sm:col-span-6 mt-3">
                  <label htmlFor="modal-datepicker-1" className="form-label">
                    Tanggal Terbuang
                  </label>
                  <input
                    id="crud-form-1"
                    type="text"
                    className="form-control w-full"
                    readOnly
                    value={helper.formatDate(data?.wasted_date,'DD MMM YYYY') }
                  />
              
                </div>

                <div className="mt-3">
                  <label htmlFor="crud-form-1" className="form-label">
                    Catatan
                  </label>
                  <textarea
                    id="crud-form-1"
                    type="text"
                    className="form-control w-full"
                    value={data?.description}
                  />
                </div>
                <div className="text-right mt-5">
                  <Link to="/inventori/stok-wasted">
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-24 mr-1"
                    >
                      Kembali
                    </button>
                  </Link>

                </div>
              </div>
              {/* END: Form Layout */}
            </div>
          
            <div className="intro-y col-span-12  overflow-auto  bg-white px-4 pb-4">
              <table className="table table-report">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap">Nama Barang</th>
                    <th className="whitespace-nowrap">Jenis</th>
                    <th className="text-center whitespace-nowrap">
                      Stok System
                    </th>
                    <th className="text-center whitespace-nowrap">
                      Stok Terbuang
                    </th>
                    <th className="text-center whitespace-nowrap">
                      Harga Modal
                    </th>
                    <th className="text-center whitespace-nowrap">Catatan</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.materials?.map((field, index) => (
                    <>
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            value={field?.name}
                            readOnly
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={field?.type}
                            readOnly
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={field?.pivot?.system_stock}
                            readOnly
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={field?.pivot?.wasted_stock}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={formatRupiah (field?.pivot?.capital,'Rp.')}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={field?.pivot?.description}
                          />
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </form>

      </div>
    </>
  );
}

export default Detail;

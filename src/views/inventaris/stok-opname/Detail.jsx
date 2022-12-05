import { Litepicker } from "@/base-components";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useOpnameStock } from "../../../hooks/useOpnameStock";
import { helper } from "../../../utils/helper";

function Detail() {
  const [date, setDate] = useState("");
  let { id } = useParams();
  const { data } = useOpnameStock(id);
  useEffect(() => {
    if (data) setDate(data.incoming_date);
  }, [data]);
  return (
    <>
      <div>
        <div className="intro-y flex items-center mt-8">
          <h2 className="text-lg font-medium mr-auto"> Stok Opname</h2>
        </div>
        <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="intro-y col-span-12 lg:col-span-4">
            {/* BEGIN: Form Layout */}
            <div className="intro-y box p-5">
              <div>
                <label htmlFor="crud-form-1" className="form-label">
                  Nomor Opname
                </label>
                <input
                  id="crud-form-1"
                  type="text"
                  className="form-control w-full"
                  value={data?.opname_number}
                  disabled
                />
              </div>
              <div className="col-span-12 sm:col-span-6 mt-3">
                <label className="form-label">Tanggal</label>
                <input
                  type="text"
                  className="form-control w-full"
                  value={helper.formatDate(data?.opname_date, "DD MMMM YYYY")}
                  disabled
                />
              </div>
              <div className="col-span-12 sm:col-span-6 mt-3">
                <label htmlFor="crud-form-1" className="form-label">
                  Catatan
                </label>
                <textarea
                  id="crud-form-1"
                  type="text"
                  className="form-control w-full"
                  value={data?.description}
                  disabled
                />
              </div>
              <div className="text-right mt-5">
                <Link to="/inventori/stok-opname">
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

          <div className="intro-y col-span-12  overflow-auto bg-white px-4 pb-4">
            <table className="table table-report">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">Nama Barang</th>
                  <th className="whitespace-nowrap">Jenis</th>
                  <th className="text-center whitespace-nowrap">Stok Aktual</th>
                  <th className="text-center whitespace-nowrap">Stok Sistem</th>
                  <th className="text-center whitespace-nowrap">Selisih</th>
                  <th className="text-center whitespace-nowrap">Harga Modal</th>
                  <th className="text-center whitespace-nowrap">Catatan</th>
                </tr>
              </thead>
              <tbody>
                {data?.materials?.map((field, index) => (
                  <>
                    <tr key={field.id}>
                      <td>
                        <input type="text" readOnly value={field?.name} />
                      </td>
                      <td>
                        <input
                          type="text"
                          readOnly
                          value={field?.type}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          readOnly
                          value={field?.pivot?.actual_stock}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          readOnly
                          value={field?.pivot?.system_stock}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          readOnly
                          value={field?.pivot?.diff_stock}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          readOnly
                          value={field?.pivot?.capital}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          readOnly
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
      </div>
    </>
  );
}

export default Detail;

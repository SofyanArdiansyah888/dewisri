import { Litepicker } from "@/base-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
// const [incomingStock, setincomingStock] = useState({});
// const [loading, setLoading] = useState(false);

// useEffect(() => {
//   getIncomingStock();
//   return () => {};
// }, []);

// async function getIncomingStock() {
//   setLoading(true);
//   let response = await api.get(`incoming-stocks/${1}`);
//   setincomingStock(response.data);
//   setLoading(false);
// }

function Detail() {
  const [date, setDate] = useState("");
  return (
    <>
      <div>
        <div className="intro-y flex items-center mt-8">
          <h2 className="text-lg font-medium mr-auto"> Stok Masuk</h2>
        </div>
        <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="intro-y col-span-12 lg:col-span-4">
            {/* BEGIN: Form Layout */}
            <div className="intro-y box p-5">
              <div>
                <label htmlFor="crud-form-1" className="form-label">
                  Nomor Faktur
                </label>
                <input
                  id="crud-form-1"
                  type="text"
                  className="form-control w-full"
                  disabled
                />
              </div>
              <div className="col-span-12 sm:col-span-6 mt-3">
                <label htmlFor="modal-datepicker-1" className="form-label">
                  Tanggal Masuk
                </label>

                <Litepicker
                  id="modal-datepicker-2"
                  value={date}
                  onChange={setDate}
                  options={{
                    format: "DD MMMM YYYY",
                    autoApply: false,
                    showWeekNumbers: false,

                    dropdowns: {
                      minYear: 1990,
                      maxYear: null,
                      months: true,
                      years: true,
                    },
                  }}
                  className="form-control"
                />
              </div>
              <div className="text-right mt-5">
                <Link to="/inventori/stok-masuk">
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
                  <th className="whitespace-nowrap">Bahan</th>
                  <th className="whitespace-nowrap">Harga Beli</th>
                  <th className="text-center whitespace-nowrap">
                    Stok Ditambahkan
                  </th>
                  <th className="text-center whitespace-nowrap">Harga Total</th>
                </tr>
              </thead>
              <tbody>
                {/* {fields.map((field, index) => (
                    <>
                      <tr key={field.id}>
                        <td>
                          <input
                            type="text"
                            {...register(`material.${index}.name`)}
                            readOnly
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            {...register(`material.${index}.capital`)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            {...register(`material.${index}.stock`)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            {...register(`material.${index}.total_capital`)}
                            value={watchFieldArray[index].total_capital}
                            readOnly
                          />
                        </td>
                        <td>
                          <a
                            className="flex items-center text-danger"
                            onClick={() => remove(index)}
                          >
                            <Lucide icon="Trash2" className="w-4 h-4 mr-1" />{" "}
                            Delete
                          </a>
                        </td>
                      </tr>
                    </>
                  ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;

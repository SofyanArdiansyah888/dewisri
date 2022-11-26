import { Lucide } from "@/base-components";
import classnames from "classnames";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import api from "../../../../services/api";
function Material({ fields, append, prepend, remove, swap, move, insert }) {
  const { register, errors } = useFormContext();
  
  const [materials, setMaterials] = useState([]);
  useEffect(() => {
    getMaterials();
  }, []);
  async function getMaterials() {
    let response = await api.get("materials?type=RAW");
    setMaterials(response.data);
  }
  return (
    <>
      <div className="intro-y box p-5 mt-5">
        <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
          <div className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
            <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Bahan Baku
          </div>
          <div className="mt-5">
            <div className="form-inline items-start flex-row mt-5 pt-5 first:mt-0 first:pt-0">
              <div className="flex-1">
                {fields.length > 0 && (
                  <table className="table table-report -mt-2">
                    <thead className="bg-primary text-white ">
                      <tr>
                        <th className="whitespace-nowrap">Bahan Baku</th>
                        <th className="whitespace-nowrap">Jumlah</th>
                        <th className="text-center whitespace-nowrap">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fields.map((item, index) => (
                        <tr key={index} className="intro-x">
                          <td>
                            <select
                              className={classnames({
                                "form-select": true,
                                // "border-danger": errors.material,
                              })}
                              placeholder="Nama Material"
                              {...register(`material.${index}.id`)}
                              defaultValue={`${item.id}`}
                            >
                              {materials.map(
                                    (material, index) => (
                                      <option key={index} value={material.id}>
                                        {material.name}
                                      </option>
                                    )
                                  )}
                            </select>
                            {/* {errors.material && (
                              <div className="text-danger mt-2">
                                {errors.material.message}
                              </div>
                            )} */}
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Jumlah Bahan Baku"
                              {...register(`material.${index}.quantity`)}
                              defaultValue="0"
                            />
                          </td>
                          <td className="table-report__action w-56">
                            <div className="flex justify-center items-center">
                              <button
                                type="button"
                                className="btn btn-outline-danger flex items-center text-danger"
                                onClick={() => remove(index)}
                              >
                                <Lucide
                                  icon="Trash2"
                                  className="w-4 h-4 mr-1"
                                />{" "}
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                <button
                  type="button"
                  className="btn btn-outline-primary w-full"
                  onClick={() => {
                    append({ id: "" });
                  }}
                >
                  <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Tambah Bahan
                  Baku
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Material;

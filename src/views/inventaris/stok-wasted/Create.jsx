import { Litepicker, Lucide } from "@/base-components";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { helper } from "../../../utils/helper";
import MaterialModal from "../MaterialModal";
import MaterialSupportModal from "../MaterialSupportModal";
import { yupResolver } from "@hookform/resolvers/yup";
import { getVariable } from "eslint-plugin-react/lib/util/variable";
import api from "../../../services/api";
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
function Main() {
  const [date, setDate] = useState("");
  const [modal, showModal] = useState(false);
  const [supportModal, showsupportModal] = useState(false);
  const [wastedNumber, setwastedNumber] = useState("");
  const navigate = useNavigate();
  const {
    register,
    trigger,
    formState: { errors },
    handleSubmit,
    getValues,
    control,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      material: [],
    },
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "material",
  });

  useEffect(() => {
    let date = new Date();
    let timestamp = helper.timeStampNow().toString();
    setwastedNumber(
      `WST/${date.getDay()}${date.getMonth()}${date.getFullYear()}/${timestamp.substring(
        timestamp.length - 3
      )}`
    );
  }, []);

  const handleCreate = async (data) => {
    
    try {
      await api.post("wasted-stocks", {
        ...data,
      });
      navigate("/inventori/stok-wasted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div className="intro-y flex items-center mt-8">
          <h2 className="text-lg font-medium mr-auto">Tambah Stok Terbuang</h2>
        </div>
        <form className="validate-form" onSubmit={handleSubmit(handleCreate)}>
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
                    {...register(`wasted_number`)}
                    readOnly
                    value={wastedNumber}
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
                    {...register(`description`)}
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

                  <button type="submit" className="btn btn-primary w-24">
                    Simpan
                  </button>
                </div>
              </div>
              {/* END: Form Layout */}
            </div>
            <div className="col-span-12 gap-[10px] text-right">
              <button
                type="button"
                className="btn btn-outline-primary flex-1 mx-auto"
                onClick={() => showModal(true)}
              >
                Tambah Bahan Baku
              </button>
              <button
                type="button"
                className="btn btn-outline-primary flex-1  mx-auto ml-4"
                onClick={() => showsupportModal(true)}
              >
                Tambah Bahan Pendukung
              </button>
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
                    <th className="text-center whitespace-nowrap">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field, index) => (
                    <>
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            {...register(`material.${index}.name`)}
                            readOnly
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`material.${index}.type`)}
                            readOnly
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            {...register(`material.${index}.system_stock`)}
                            readOnly
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            {...register(`material.${index}.wasted_stock`)}
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
                            type="text"
                            {...register(`material.${index}.description`)}
                          />
                        </td>
                        <td>
                          <a
                            className="flex items-center text-danger"
                            href="#"
                            onClick={() => remove(index)}
                          >
                            <Lucide icon="Trash2" className="w-4 h-4 mr-1" />{" "}
                            Delete
                          </a>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </form>

        <MaterialModal
          modal={modal}
          showModal={showModal}
          append={append}
          additionalAppend={additionalAppend}
        />

        <MaterialSupportModal
          modal={supportModal}
          showModal={showsupportModal}
          append={append}
          additionalAppend={additionalAppend}
        />
      </div>
    </>
  );
}

export default Main;

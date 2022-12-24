import { Alert, Lucide, Litepicker } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useCreateWastedStock } from "../../../hooks/useWastedStock";
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
function Main() {
  const [date, setDate] = useState("");
  const [modal, showModal] = useState(false);
  const [supportModal, showsupportModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const { mutate, isLoading } = useCreateWastedStock(() => {
    navigate("/inventori/stok-wasted");
  });

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
    setValue(
      "wasted_number",
      `WST/${date.getDay()}${date.getMonth()}${date.getFullYear()}/${timestamp.substring(
        timestamp.length - 3
      )}`
    );
    setValue('wasted_date',date)
  }, []);

  const handleCreate = async (data) => {
    
    let isZero = data.material.some((material) => material.wasted_stock == 0);
    if (isZero) {
      setErrorMessage("Stok Terbuang Tidak Boleh Kosong");
      return;
    }
    
    if (data.material.length === 0) {
      setErrorMessage("Material harus diisi");
      return;
    }
    let isEmpty = data.material.some((material) => material.description == '')
    if(isEmpty){
      setErrorMessage("Deskripsi Material harus diisi");
      return;
    }

    data.material.map((material) => {
      material.capital = material.capital.replace(/\D/g,'')
      return material;
    })
    
    mutate(data);
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
                  />
                </div>
                <div className="col-span-12 sm:col-span-6 mt-3">
                  <label htmlFor="modal-datepicker-1" className="form-label">
                    Tanggal Terbuang
                  </label>
                  <input
                    type="hidden"
                    {...register(`wasted_date`)}
                    readOnly
                  />
                  <Litepicker
                    id="modal-datepicker-2"
                    value={date}
                    onChange={(e) => {
                      setDate(e);
                      setValue("wasted_date", e);
                    }}
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
                  <Link to="/inventori/stok-wasted">
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-24 mr-1"
                    >
                      Kembali
                    </button>
                  </Link>

                  <button type="submit" className="btn btn-primary w-24" disabled={isLoading}>
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
              {errorMessage && (
                <Alert className="box intro-y bg-red-500 text-white flex items-center mt-4">
                  {({ dismiss }) => (
                    <>
                      <span>{errorMessage}</span>
                      <button
                        type="button"
                        className="btn-close text-white"
                        onClick={() => {
                          dismiss();
                          setErrorMessage(null);
                        }}
                        aria-label="Close"
                      >
                        <Lucide icon="X" className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </Alert>
              )}
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
                            type="text"
                            {...register(`material.${index}.capital`)}
                            onInput={(e) => {
                              setValue(`material.${index}.capital`, formatRupiah(e.target.value,'Rp.'))
                          }}
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

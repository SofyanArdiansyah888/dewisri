import { Litepicker, Lucide, Alert } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useCreateOpnameStock, useOpnameStock } from "../../../hooks/useOpnameStock";
import api from "../../../services/api";
import { formatRupiah } from "../../../utils/formatter";
import { helper } from "../../../utils/helper";
import MaterialModal from "../MaterialModal";
import MaterialSupportModal from "../MaterialSupportModal";
const schema = yup.object({
  opname_number: yup.string().required(),
});
const additionalAppend = {
  capital: 0,
  actual_stock: 0,
  system_stock: 0,
  description: "",
  diff_stock: 0,
};
function Main() {
  const [date, setDate] = useState("");
  const [modal, showModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [supportModal, showsupportModal] = useState(false);
  const { mutate, isLoading } = useCreateOpnameStock(() => {
    navigate("/inventori/stok-opname");
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
    watch,
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

  const watchFieldArray = watch("material").map((test, index) => {
    test.diff_stock = test.actual_stock - test.system_stock;
    return test;
  });

  useEffect(() => {
    let date = new Date();
    let timestamp = helper.timeStampNow().toString();
    setValue(
      "opname_number",
      `OPN/${date.getDay()}${date.getMonth()}${date.getFullYear()}/${timestamp.substring(
        timestamp.length - 3
      )}`
    );
    setValue("opname_date", new Date());
  }, []);

  const handleCreate = async (data) => {
    let isZero = data.material.some((material) => material.stock_actual == 0);

    if (isZero) {
      setErrorMessage("Stok Aktual Tidak Boleh Kosong");
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
      material.capital = material.capital.toString().replace(/\D/g,'')
      return material;
    })
    
    mutate(data);
  };

  return (
    <>
      <div>
        <div className="intro-y flex items-center mt-8">
          <h2 className="text-lg font-medium mr-auto">Tambah Stok Opname</h2>
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
                    type="text"
                    className="form-control w-full"
                    {...register(`opname_number`)}
                    readOnly
                  />
                </div>
                <div className="col-span-12 sm:col-span-6 mt-3">
                  <label htmlFor="modal-datepicker-1" className="form-label">
                    Tanggal Masuk
                  </label>

                  <Litepicker
                    id="modal-datepicker-2"
                    value={date}
                    onChange={(e) => {
                      setDate(e);
                      setValue("opname_date", e);
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
                  <Link to="/inventori/stok-opname">
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-24 mr-1"
                    >
                      Kembali
                    </button>
                  </Link>

                  <button type="submit" className="btn btn-primary w-24"  disabled={isLoading}>
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
                      Stok Aktual
                    </th>
                    <th className="text-center whitespace-nowrap">
                      Stok Sistem
                    </th>

                    <th className="text-center whitespace-nowrap">Selisih</th>
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
                            {...register(`material.${index}.actual_stock`)}
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
                            {...register(`material.${index}.diff_stock`)}
                            value={watchFieldArray[index].diff_stock}
                            readOnly
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
                          <button
                            className="flex items-center text-danger"
                            onClick={() => remove(index)}
                           
                          >
                            <Lucide icon="Trash2" className="w-4 h-4 mr-1" />{" "}
                            Delete
                          </button>
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

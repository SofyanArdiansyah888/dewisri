import { Litepicker, Lucide } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import api from "../../../services/api";
import { helper } from "../../../utils/helper";
import MaterialModal from "../MaterialModal";
import MaterialSupportModal from "../MaterialSupportModal";
const schema = yup.object({
  invoice_number: yup.string().required(),
});
const additionalAppend = {
  capital: 0,
  stock: 0,
  total_capital: 0,
};

function Main() {
  const [date, setDate] = useState("");
  const [modal, showModal] = useState(false);
  const [supportModal, showsupportModal] = useState(false);
  const [nomorFaktur, setNomorFaktur] = useState("");
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
  const watchFieldArray = watch('material').map((test,index) => {
    test.total_capital = test.capital * test.stock;
    return test
  });
  

  useEffect(() => {
    let date = new Date();
    let timestamp = helper.timeStampNow().toString();
    setNomorFaktur(
      `FAK/${date.getDay()}${date.getMonth()}${date.getFullYear()}/${timestamp.substring(
        timestamp.length - 3
      )}`
    );
  }, []);

  const handleCreate = async (data) => {
    try {
      await api.post("incoming-stocks", {
        ...data,
        incoming_date: date,
      });
      navigate("/inventori/stok-masuk");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <div>
        <div className="intro-y flex items-center mt-8">
          <h2 className="text-lg font-medium mr-auto">Tambah Stok Masuk</h2>
        </div>
        <form className="validate-form" onSubmit={handleSubmit(handleCreate)}>
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
                    {...register(`invoice_number`)}
                    readOnly
                    value={nomorFaktur}
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
            <div className="intro-y col-span-12  overflow-auto bg-white px-4 pb-4">
              <table className="table table-report">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap">Bahan</th>
                    <th className="whitespace-nowrap">Harga Beli</th>
                    <th className="text-center whitespace-nowrap">
                      Stok Ditambahkan
                    </th>
                    <th className="text-center whitespace-nowrap">
                      Harga Total
                    </th>
                    <th className="text-center whitespace-nowrap">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field, index) => (
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

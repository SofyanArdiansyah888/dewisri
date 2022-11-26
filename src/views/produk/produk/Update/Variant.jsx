import {
  Lucide,
  Tippy,
  TomSelect,
  Alert,
  ClassicEditor,
} from "@/base-components";
import { useFormContext } from "react-hook-form";
export default function Variant({
  fields,
  append,
  prepend,
  remove,
  swap,
  move,
  insert,
}) {
  const { register } = useFormContext();
  return (
    <>
      {/* VARIANT */}
      <div className="intro-y box p-5 mt-5">
        <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
          <div className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
            <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Varian Produk
          </div>

          <div className="form-inline items-start flex-col xl:flex-row mt-5  first:mt-0 first:pt-0">
            {/* FORM FIELD */}
            <div className="w-full  xl:mt-0 flex-1">
              {fields.map((item, index) => {
                return (
                  <div key={index} className="sm:grid grid-cols-4 gap-2 mt-3">
                    {/* NAME */}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nama Varian"
                      {...register(`variant.${index}.name`)}
                      defaultValue={`${item.name}`}
                    />
                    {/* PRICE */}
                    <div className="input-group">
                      <div className="input-group-text">Rp.</div>
                      <input
                        type="number"
                        className="form-control mt-2 sm:mt-0"
                        placeholder="Harga"
                        {...register(`variant.${index}.price`)}
                        defaultValue={`${item.price}`}
                      />
                    </div>
                    <button
                    type="button"
                      className="btn btn-outline-danger flex items-center text-danger"
                      onClick={() => remove(index)}
                    >
                      <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Hapus
                    </button>
                  </div>
                );
              })}

              <button
                type="button"
                className="btn btn-outline-primary w-full mt-4"
                onClick={() => {
                  append({ name: "", price: "0" });
                }}
              >
                <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Tambah Varian
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import {
  Lucide,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@/base-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useCreateCashFlow } from "../../hooks/useCashFlow";
const schema = yup.object({
  amount: yup.number().min(1).required(),
  description: yup.string().required(),
});
export default function CashFlowModal({ setModal, modal }) {
  const [selectedType, setSelectedType] = useState("IN");
  const { mutate: createCashFlow } = useCreateCashFlow(() => {
    reset();
    setModal(false);
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleSelectType = (type) => {
    //   setValue("item_price", type.price);
    setSelectedType(type);
  };
  return (
    <Modal show={modal} onHidden={() => setModal(false)} size="modal-lg">
      <form
        onSubmit={handleSubmit((data) => {
          let result = {
            ...data,
            type: selectedType,
          };
          createCashFlow(result)
        })}
      >
        <ModalHeader>
          <h2 className="font-medium text-base mr-auto">Cash In/Out</h2>
        </ModalHeader>
        <ModalBody>
          <div className="col-span-12">
            <div className="m-4 flex flex-row gap-3">
              <div className="flex-1">
                <div className="form-control">
                  <label className="font-semibold">Pilih In/Out</label>

                  <div
                    onClick={() => handleSelectType("IN")}
                    className={`box ${
                      selectedType === "IN" ? "bg-info" : "bg-gray-100"
                    } w-full h-[50px] mt-2 rounded-md text-center pt-2 text-xl`}
                  >
                    Masuk
                  </div>

                  <div
                    onClick={() => handleSelectType("OUT")}
                    className={`box ${
                      selectedType === "OUT" ? "bg-info" : "bg-gray-100"
                    } w-full h-[50px] mt-2 rounded-md text-center pt-2 text-xl`}
                  >
                    Keluar
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-3">
                <div className="form-control">
                  <label className="font-medium mb-2">Jumlah</label>
                  <input
                    type="text"
                    {...register("amount", { required: true })}
                    className="input input-bordered input-md w-full bg-slate-50 "
                  />
                  {errors.amount && (
                    <span className="text-xs text-red-700 mt-1 font-semibold">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="font-medium mb-2">Keterangan</label>
                  <textarea
                    type="text"
                    {...register("description", { required: true })}
                    className="input input-bordered input-md w-full bg-slate-50"
                  />
                  {errors.description && (
                    <span className="text-xs text-red-700 mt-1 font-semibold">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="text-right">
          <button
            type="button"
            className="btn  btn-md flex-1  btn-outline "
            onClick={() => setModal(false)}
          >
            Kembali
          </button>
          <button type="submit" className="btn btn-primary btn-md flex-1 ml-2">
            Simpan
          </button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

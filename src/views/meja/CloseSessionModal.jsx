import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useCreateCashFlow } from "../../hooks/useCashFlow";
import { useCreateCloseSession } from "../../hooks/useCloseSession";
const schema = yup.object({
  opening_cash: yup.number().required(),
  payment: yup.number().required(),
  cash_in: yup.number().required(),
  cash_out: yup.number().required(),
  total: yup.number().required(),
  manual_count: yup.number().required(),
  description: yup.string().required(),
});
export default function CloseSessionModal({ setModal, modal, sessionData }) {
  const { mutate: createSession } = useCreateCloseSession(() => {
    reset();
    setModal(false);
  });

  useEffect(() => {
    if (sessionData) {
      let openingCash = sessionData.opening_cash;
      let cashIn = sessionData.cash_in;
      let cashOut = sessionData.cash_out;
      let payment = sessionData.payment;
      let total = sessionData.total;
      setValue("opening_cash", openingCash);
      setValue("payment", payment);
      setValue("cash_in", cashIn);
      setValue("cash_out", cashOut);
      setValue("total", total);

      setValue("total_order", sessionData.total_order);
      setValue("cash", sessionData.cash);
      setValue("debit", sessionData.debit);
    } else {
      setValue("total_order", 0);
      setValue("cash", 0);
      setValue("debit", 0);
    }
  }, [sessionData]);

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

  return (
    <Modal show={modal} onHidden={() => setModal(false)} size="modal-lg">
      <form
        onSubmit={handleSubmit((data) => {
          const result = {
            ...data,
            diff_count: data.total - data.manual_count,
            type: "CLOSE",
          };
          createSession(result);
        })}
      >
        <ModalHeader>
          <h2 className="font-medium text-base mr-auto">Close Session</h2>
        </ModalHeader>
        <ModalBody>
          <div className="col-span-12">
            <div className="flex flex-col gap-3">
              {/* KAS BUKA */}
              <div className="form-control">
                <label className="font-medium mb-2">Kas Buka</label>
                <input
                  type="text"
                  {...register("opening_cash", { required: true })}
                  className="input input-bordered input-md w-full bg-slate-50 "
                  disabled
                />
              </div>
              <div className="flex flex-row gap-4">
                <div className="form-control">
                  <label className="font-medium mb-2">Kas Masuk</label>
                  <input
                    type="text"
                    {...register("cash_in", { required: true })}
                    className="input input-bordered input-md w-full bg-slate-50 "
                    disabled
                  />
                </div>

                <div className="form-control">
                  <label className="font-medium mb-2">Kas Keluar</label>
                  <input
                    type="text"
                    {...register("cash_out", { required: true })}
                    className="input input-bordered input-md w-full bg-slate-50 "
                    disabled
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="font-medium mb-2">Income</label>
                <input
                  type="text"
                  {...register("payment", { required: true })}
                  className="input input-bordered input-md w-full bg-slate-50 "
                  disabled
                />
              </div>

              <div className="form-control">
                <label className="font-medium mb-2">Total Kas Sistem </label>
                <input
                  type="text"
                  {...register("total", { required: true })}
                  className="input input-bordered input-md w-full bg-slate-50 "
                  disabled
                />
              </div>

              <div className="form-control">
                <label className="font-medium mb-2">Kas Tutup</label>
                <input
                  type="text"
                  {...register("manual_count", { required: true })}
                  className="input input-bordered input-md w-full  "
                />
                {errors.manual_count && (
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
                  className="input input-bordered input-md w-full"
                />
                {errors.description && (
                  <span className="text-xs text-red-700 mt-1 font-semibold">
                    This field is required
                  </span>
                )}
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

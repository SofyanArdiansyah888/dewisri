import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useCreateOpenSession } from "../../hooks/useOpenSession";
const schema = yup.object({
  opening_cash: yup.number().min(1).required(),
  description: yup.string().required(),
});
export default function OpenSessionModal({ setModal, modal }) {
  const { mutate: createSession } = useCreateOpenSession(() => {
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

  return (
    <Modal show={modal} onHidden={() => setModal(false)} size="modal-lg">
      <form
        onSubmit={handleSubmit((data) => {
          const result = {
            ...data,
            total_order: 0,
            payment: 0,
            cash: 0,
            debit: 0,
            manual_count: 0,
            diff_count: 0,
            cash_in: 0,
            cash_out: 0,
            type: "OPEN",
          };
          createSession(result);
        })}
      >
        <ModalHeader>
          <h2 className="font-medium text-base mr-auto">Open Session</h2>
        </ModalHeader>
        <ModalBody>
          <div className="col-span-12">
            <div className="flex flex-col gap-3">
              <div className="form-control">
                <label className="font-medium mb-2">Cash Buka</label>
                <input
                  type="text"
                  {...register("opening_cash", { required: true })}
                  className="input input-bordered input-md w-full bg-slate-50 "
                />
                {errors.opening_cash && (
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

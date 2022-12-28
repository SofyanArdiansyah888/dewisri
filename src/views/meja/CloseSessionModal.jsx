import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useCreateCloseSession } from "../../hooks/useCloseSession";
import { getUser } from "../../services/database";
import { formatRupiah } from "../../utils/formatter";
const schema = yup.object({
  description: yup.string().required(),
});
export default function CloseSessionModal({ setModal, modal, sessionData }) {
  const { mutate: createSession, isLoading } = useCreateCloseSession(() => {
    reset();
    setModal(false);
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    let user = getUser();
    if (user) setValue("description", `Tutup Session By ${user.name} `);
    return () => modal
  },[modal]);

  const handleSimpan = (data) => {
    createSession({ ...data, action: "simpan" });
  };

  const handleSimpanPrint = (data) => {
    createSession({ ...data, action: "simpan print day" });
  };

  const handleSimpanPrintShift = (data) => {
    createSession({ ...data, action: "simpan print shift" });
  };

  return (
    <Modal show={modal} onHidden={() => setModal(false)} size="modal-lg">
      <form onSubmit={handleSubmit(handleSimpan)}>
        <ModalHeader>
          <h2 className="font-medium text-base mr-auto">Close Sesi</h2>
        </ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-2">
            <div className="mt-2">
              <label className="font-semibold">Opening Cash</label>
              <p className="mt-1">
                {formatRupiah(sessionData?.opening_cash, "Rp.")}
              </p>
            </div>

            <div className="mt-2">
              <label className="font-semibold">Item Sales</label>
              <p className="mt-1">
                {formatRupiah(sessionData?.item_sales, "Rp.")}{" "}
                <span className="font-semibold">
                  ({sessionData?.item_sales_quantity})
                </span>{" "}
              </p>
            </div>

            <div className="mt-2">
              <label className="font-semibold">Bill Discount</label>
              <p className="mt-1">
                {formatRupiah(sessionData?.bill_discount, "Rp.")}{" "}
                <span className="font-semibold">
                  ({sessionData?.bill_discount_quantity})
                </span>{" "}
              </p>
            </div>

            <div className="mt-2">
              <label className="font-semibold">Total Sales</label>
              <p className="mt-1">
                {formatRupiah(sessionData?.total_sales, "Rp.")}
              </p>
            </div>

            <div className="mt-2">
              <label className="font-semibold">Total Cash</label>
              <p className="mt-1">
                {formatRupiah(sessionData?.total_cash, "Rp.")}{" "}
                <span className="font-semibold">
                  ({sessionData?.total_cash_quantity})
                </span>
              </p>
            </div>

            <div className="mt-2">
              <label className="font-semibold">Total Debit</label>
              <p className="mt-1">
                {formatRupiah(sessionData?.total_debit, "Rp.")}{" "}
                <span className="font-semibold">
                  ({sessionData?.total_debit_quantity})
                </span>
              </p>
            </div>

            <div className="mt-2">
              <label className="font-semibold">Void</label>
              <p className="mt-1">
                {formatRupiah(sessionData?.send_void, "Rp.")}{" "}
                <span className="font-semibold">
                  ({sessionData?.send_void_quantity})
                </span>
              </p>
            </div>

            <div className="mt-2">
              <label className="font-semibold">Tax Service</label>
              <p className="mt-1">
                {formatRupiah(sessionData?.tax_service, "Rp.")}
              </p>
            </div>

            <div className="mt-2">
              <label className="font-semibold">Tax PPN</label>
              <p className="mt-1">
                {formatRupiah(sessionData?.tax_ppn, "Rp.")}
              </p>
            </div>

            <div className="mt-2">
              <label className="font-semibold">Net Sales</label>
              <p className="mt-1">
                {formatRupiah(sessionData?.net_sales, "Rp.")}
              </p>
            </div>

            <div className="mt-2">
              <label className="font-semibold">Total Bill</label>
              <p className="mt-1">{sessionData?.total_bill}</p>
            </div>

            <div className="mt-2">
              <label className="font-semibold">Average Bill</label>
              <p className="mt-1">
                {formatRupiah(sessionData?.average_bill, "Rp.")}
              </p>
            </div>

            <div className="mt-2">
              <label className="font-semibold">Cash In Drawer</label>
              <p className="mt-1">
                {formatRupiah(sessionData?.cash_in_drawer, "Rp.")}
              </p>
            </div>

            <div className="mt-2">
              <label className="font-medium mb-2">Keterangan</label>
              <textarea
                type="text"
                {...register("description", { required: true })}
                className="w-full bg-slate-50 "
                readOnly
              />
              {errors.description && (
                <span className="text-xs text-red-700 mt-1 font-semibold">
                  This field is required
                </span>
              )}
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
          <button
            type="submit"
            className="btn btn-primary btn-md flex-1 ml-2"
            disabled={isLoading}
          >
            Simpan
          </button>
          <button
            type="button"
            onClick={handleSubmit(handleSimpanPrintShift)}
            className="btn bg-yellow-200 btn-md flex-1 ml-2"
            disabled={isLoading}
          >
            Simpan & Print Shift
          </button>
          {/* <button
            type="button"
            onClick={handleSubmit(handleSimpanPrint)}
            className="btn bg-yellow-200 btn-md flex-1 ml-2"
          >
            Simpan & Print All Day
          </button> */}
        </ModalFooter>
      </form>
    </Modal>
  );
}

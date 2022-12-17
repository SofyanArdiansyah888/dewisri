import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useCreateDiscount } from "../../hooks/useDiscounts";
// VALIDATION
const schema = yup.object({
  name: yup.string().required(),
  amount: yup.string().required(),
});
function CreateModal({ modal, setModal }) {
  const { mutate } = useCreateDiscount( () => {
    reset(() => ({
      name: "",
      amount: "",
    }));
    setModal(false);
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });


  return (
    <>
      <Modal
        show={modal}
        onHidden={() => {
          setModal(false);
        }}
      >
        <form
          className="validate-form"
          onSubmit={handleSubmit((data) => mutate(data))}
        >
          <ModalHeader>
            <h2 className="font-medium text-base mr-auto">Create Discount</h2>
          </ModalHeader>
          <ModalBody className="grid grid-cols-12 gap-4 gap-y-3">
            <div className="col-span-12">
              <label htmlFor="name" className="form-label">
                Nama
              </label>
              <input
                {...register("name")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.name,
                })}
                name="name"
                id="name"
                type="text"
              />
              {errors.name && (
                <div className="text-danger mt-2">{errors.name.message}</div>
              )}
            </div>

  
            <div className="col-span-12">
              <label htmlFor="amount" className="form-label">
                Jumlah (%)
              </label>
              <input
                {...register("amount")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.amount,
                })}
                name="amount"
                id="amount"
                type="text"
              />
              {errors.amount && (
                <div className="text-danger mt-2">{errors.amount.message}</div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              onClick={() => {
                setModal(false);
              }}
              className="btn btn-outline-secondary w-20 mr-1"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary w-20">
              Submit
            </button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

export default CreateModal;

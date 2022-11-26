import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import api from "../../services/api";
// VALIDATION
const schema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  amount: yup.string().required(),
});
function UpdateModal({ modal, setModal, tax, setIsChanged }) {
  const {
    register,
    trigger,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (tax) {
      setValue("name", tax.name);
      setValue("description", tax.description);
      setValue("amount", tax.amount);
    }
  });

  const handleUpdate = async (data) => {
    const result = await trigger();

    if (result) {
      try {
        await api.put(`taxes/${tax.id}`, { ...data });
        reset(() => ({
          name: "",
          description: "",
          amount: "",
        }));
        setModal(false);
        setIsChanged(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Modal
        show={modal}
        onHidden={() => {
          setModal(false);
        }}
      >
        <form className="validate-form" onSubmit={handleSubmit(handleUpdate)}>
          <ModalHeader>
            <h2 className="font-medium text-base mr-auto">Update tax</h2>
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
              <label htmlFor="description" className="form-label">
                Deskripsi
              </label>
              <input
                {...register("description")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.description,
                })}
                name="description"
                id="description"
                type="text"
              />
              {errors.description && (
                <div className="text-danger mt-2">
                  {errors.description.message}
                </div>
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
                <div className="text-danger mt-2">
                  {errors.amount.message}
                </div>
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

export default UpdateModal;

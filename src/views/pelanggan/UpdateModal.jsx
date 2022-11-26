import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import api from "../../services/api";

function UpdateModal({ modal, setModal, customer, setIsChanged }) {

  // VALIDATION
  const schema = yup
    .object({
      name: yup.string().required(),
      email: yup.string().email(),
      phone: yup.string(),
    })
    .required();
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
    if (customer) {
      setValue("name", customer.name);
      setValue("email", customer.email);
      setValue("phone", customer.phone);
    }
  });


  const handleUpdate = async (data) => {
    const result = await trigger();
    if (result) {
      try {
        await api.put(`customers/${customer.id}`, { ...data });
        reset(() => ({
          name: "",
          email: "",
          phone: "",
        }));
        setModal(false);
        setIsChanged(true);
      } catch (error) {
        console.log(error)
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
            <h2 className="font-medium text-base mr-auto">Update Customer</h2>
          </ModalHeader>
          <ModalBody className="grid grid-cols-12 gap-4 gap-y-3">
            <div className="col-span-12">
              <label htmlFor="name" className="form-label">
                Name
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
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                {...register("email")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.email,
                })}
                id="email"
                name="email"
                type="text"
              />
              {errors.email && (
                <div className="text-danger mt-2">{errors.email.message}</div>
              )}
            </div>
            <div className="col-span-12">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                {...register("phone")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.phone,
                })}
                name="phone"
                id="phone"
                type="text"
              />
              {errors.phone && (
                <div className="text-danger mt-2">
                  {errors.phone.message}
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

import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import classnames from "classnames";

import api from "../../services/api";
import { useState,useEffect } from "react";
import { pluck } from "ramda";
const schema = yup.object({
  //   name: yup.string().required().min(2),
  //   email: yup.string().email(),
  //   phone: yup.string().min(3),
});

function CreateModal({
  modal,
  setModal,
  setIsChanged,
  setReservedStep,
  tables,
}) {
  const [customers, setCustomers] = useState([]);
  const {
    register,
    trigger,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

//   useEffect(() => {
//     (async () => {
//       let result = await api.get("customers");
//       setCustomers(result.data)
//     })();
//   });

  const handleCreate = async (data) => {
    
    const reservedTable = tables.filter((table) => table.isChoosen);
    // const result = await trigger();
    let p = pluck('id')(reservedTable)
    
    // if (result) {
    //   try {
    //     await api.post("customers", { ...data });
    //     reset(() => ({
    //       name: "",
    //       email: "",
    //       phone: ""
    //     }));
    //     setModal(false);
    //     setIsChanged(true)

    //   } catch (error) {}
    // }
    setReservedStep(0);
    setModal(false);
  };
  return (
    <>
      <Modal
        show={modal}
        onHidden={() => {
          setModal(false);
        }}
      >
        <form className="validate-form" onSubmit={handleSubmit(handleCreate)}>
          <ModalHeader>
            <h2 className="font-medium text-base mr-auto">Customer Booking</h2>
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
                <div className="text-danger mt-2">{errors.phone.message}</div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              onClick={() => {
                setReservedStep(0);
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

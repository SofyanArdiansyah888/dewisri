import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import * as yup from "yup";
import { useUpdateMaterial } from "../../../hooks/useMaterial";
import api from "../../../services/api";

const schema = yup.object({
  name: yup.string().required(),
  code: yup.string().required(),
  minimal_stock: yup.number().required().typeError("Minimal stock not valid"),
});
function UpdateModal({ modal, setModal, material }) {
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


  const materialId = material && material.id;
  const { mutate } = useUpdateMaterial(materialId, () => {
    reset(() => ({
      name: "",
      code: "",
      minimal_stock: "",
    }));
    setModal(false);
  });

  useEffect(() => {
    if (material) {
      setValue("name", material.name);
      setValue("code", material.code);
      setValue("minimal_stock", material.minimal_stock);
    }
    return () => {};
  }, [material]);

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
          onSubmit={handleSubmit((data) => mutate({ ...data, type: "RAW" }))}
        >
          <ModalHeader>
            <h2 className="font-medium text-base mr-auto">Update Bahan Baku</h2>
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
                // onChange={(data) => {
                //   setValue(
                //     "code",
                //     `SKU/${helper.sanitizeString(
                //       data.target.value
                //     )}/${Math.floor(Date.now() / 1000)}`
                //   );
                // }}
              />
              {errors.name && (
                <div className="text-danger mt-2">{errors.name.message}</div>
              )}
            </div>

            <div className="col-span-12">
              <label htmlFor="code" className="form-label">
                SKU
              </label>
              <input
                {...register("code")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.code,
                })}
                // readOnly
                name="code"
                id="code"
                type="text"
              />
              {errors.code && (
                <div className="text-danger mt-2">{errors.code.message}</div>
              )}
            </div>

            <div className="col-span-12">
              <label htmlFor="minimal_stock" className="form-label">
                Minimal Stock
              </label>
              <input
                {...register("minimal_stock")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.minimal_stock,
                })}
                name="minimal_stock"
                id="minimal_stock"
                type="text"
              />
              {errors.minimal_stock && (
                <div className="text-danger mt-2">
                  {errors.minimal_stock.message}
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

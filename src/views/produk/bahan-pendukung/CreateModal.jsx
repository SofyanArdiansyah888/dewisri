import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import * as yup from "yup";
import { useCreateMaterial } from "../../../hooks/useMaterial";
import { helper } from "../../../utils/helper";
const schema = yup
.object({
  name: yup.string().required().min(2),
  code: yup.string().required(),
  minimal_stock: yup.number().required().typeError('Minimal stock not valid!'),
});
function CreateModal({ modal, setModal }) {
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

  
  const { mutate } = useCreateMaterial((data) => {  
    reset(() => ({
      name: "",
      code: "",
      minimal_stock: "",
    }));
    setModal(false);
  });
  return (
    <>
      <Modal
        show={modal}
        onHidden={() => {
          setModal(false);
        }}
      >
        <form className="validate-form" onSubmit={handleSubmit((data) => mutate({ ...data, type: "SUPPORT" }))}>
          <ModalHeader>
            <h2 className="font-medium text-base mr-auto">Create Bahan Pendukung</h2>
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
                onChange={(data) => {
                  setValue(
                    "code",
                    `SUP/${helper.sanitizeString(
                      data.target.value
                    )}/${helper.timeStampNow()}`
                  );
                }}
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
                name="code"
                id="code"
                type="text"
                readOnly
              
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
                <div className="text-danger mt-2">{errors.minimal_stock.message}</div>
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

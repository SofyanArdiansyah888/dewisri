import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import api from "../../services/api";

const schema = yup
.object({
  name: yup.string().required(),
  description: yup.string().required(),
  ip_address: yup.string().required(),
});
function CreateModal({ modal, setModal,setIsChanged }) {
  const {
    register,
    trigger,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema)
  });

  const handleCreate = async (data) => {
    const result = await trigger();

    if (result) {
      try {
        await api.post("printers", { ...data });
        reset(() => ({
          ...data
        }));
        setModal(false);
        setIsChanged(true)
        
      } catch (error) {}
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
        <form className="validate-form" onSubmit={handleSubmit(handleCreate)}>
          <ModalHeader>
            <h2 className="font-medium text-base mr-auto">Buat Printer</h2>
          </ModalHeader>
          <ModalBody className="grid grid-cols-12 gap-4 gap-y-3">
            <div className="col-span-12">
              <label htmlFor="name" className="form-label">
                Nama Printer
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
                <div className="text-danger mt-2">{errors.description.message}</div>
              )}
            </div>

            <div className="col-span-12">
              <label htmlFor="ip_address" className="form-label">
                Ip Address
              </label>
              <input
                {...register("ip_address")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.ip_address,
                })}
                name="ip_address"
                id="ip_address"
                type="text"
              />
              {errors.ip_address && (
                <div className="text-danger mt-2">{errors.ip_address.message}</div>
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

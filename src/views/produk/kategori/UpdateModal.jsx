import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import * as yup from "yup";
import { useUpdateCategory } from "../../../hooks/useCategory";

// VALIDATION
const schema = yup.object({
  name: yup.string().required(),
});

function UpdateModal({ modal, setModal, category }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const categoryId = category && category.id;
  const { mutate } = useUpdateCategory(categoryId, () => {
    reset(() => ({
      name: "",
    }));
    setModal(false);
  });

  useEffect(() => {
    if (category) {
      setValue("name", category.name);
    }
    return () => {};
  }, [category]);
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
          onSubmit={handleSubmit((data) => mutate({ ...data }))}
        >
          <ModalHeader>
            <h2 className="font-medium text-base mr-auto">Update Kategori</h2>
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

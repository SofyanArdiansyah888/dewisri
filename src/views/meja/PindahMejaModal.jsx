import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import * as yup from "yup";
import { useFreeTables, usePindahMeja } from "../../hooks/useTable";
const schema = yup.object({
  table_id: yup.string().required(),
});
function PindahMejaModal({ modal, setModal, table }) {
  const { data: freeTables } = useFreeTables();
  
  const { mutate: pindahMeja } = usePindahMeja(() => {
    reset(() => ({
      table_id: "",
    }));
    setModal(false);
    
  });

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

  const handlePindahMeja = async (data) => {
    pindahMeja({
      ...data,
      old_table_id:table?.id,
      order_id: table?.order?.id,
    });
  };
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
          onSubmit={handleSubmit(handlePindahMeja)}
        >
          <ModalHeader>
            <h2 className="font-medium text-base mr-auto">Pindah Meja</h2>
          </ModalHeader>
          <ModalBody className="grid grid-cols-12 gap-4 gap-y-3">
            <div className="col-span-12">
              <label htmlFor="name" className="form-label">
                Ke Meja
              </label>
              <select
                {...register("table_id")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.table_id,
                })}
                type="text"
              >
                {freeTables?.map((table) => <option value={table.id}>{table.name}</option>     )}
                
            </select>
              {errors.table_id && (
                <div className="text-danger mt-2">
                  {errors.table_id.message}
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

export default PindahMejaModal;

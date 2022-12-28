import {
  Lucide,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@/base-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useCreateVoidOrder } from "../../hooks/useVoidOrder";
import { useAdmin, useUsers } from "../../hooks/useUser";
const schema = yup.object({
  quantity: yup.number().min(1).required(),
  void_quantity: yup.number().min(1).required(),
  password: yup.string().required(),
  user_id: yup.string().required(),
});
export default function VoidModal({
  setModal,
  modal,
  setSelectedVoid,
  selectedVoid,
  tableOrder,
  setIsVoid,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const { mutate: voidOrder } = useCreateVoidOrder(() => {
    setModal(false);
    setIsVoid(false);
    reset();
  });

  const { data: users } = useAdmin();

  useEffect(() => {
    setValue("order_id", tableOrder?.id);
    setValue("product_id", selectedVoid?.product_id);
    setValue("product_name", selectedVoid?.product_name);
    setValue("item_price", selectedVoid?.item_price);
    setValue("quantity", selectedVoid?.quantity);
    setValue("void_quantity", selectedVoid?.void_quantity);
  }, [selectedVoid, tableOrder]);

  const onSubmit = (data) => {
    let temp = {
      ...data,
      table_id: tableOrder.table_id
    }
    
    voidOrder(temp);
  };

  return (
    <Modal show={modal} onHidden={() => setModal(false)} size="modal-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>
          <h2 className="font-medium text-base mr-auto">Void Item</h2>
        </ModalHeader>
        <ModalBody>
          <div className="col-span-12">
            <div className="m-4 flex flex-row gap-3">
              <div className="flex-1 flex flex-col gap-3">
                <div className="form-control">
                  <label className="font-medium mb-2">Nama Produk</label>
                  <input
                    type="text"
                    {...register("product_name", { required: true })}
                    className="input input-bordered input-md w-full bg-slate-50 "
                    disabled
                  />
                  {errors.product_name && (
                    <span className="text-xs text-red-700 mt-1 font-semibold">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="form-control hidden">
                  <label className="font-medium mb-2">Jumlah Item</label>
                  <div className="flex flex-row gap-2">
                    <input
                      type="number"
                      {...register("quantity", { required: true })}
                      className="input input-bordered input-md w-full "
                      disabled
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="font-medium mb-2">Jumlah Void</label>
                  <div className="flex flex-row gap-2">
                    <input
                      type="number"
                      {...register("void_quantity", { required: true })}
                      className="input input-bordered input-md w-full "
                    />
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        let void_quantity = getValues("void_quantity");
                        --void_quantity;
                        if (void_quantity < 0) {
                          void_quantity = 0;
                        }
                        setValue("void_quantity", void_quantity);
                      }}
                    >
                      -
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        let void_quantity = getValues("void_quantity");
                        if (void_quantity >= selectedVoid.quantity) {
                          setValue("void_quantity", selectedVoid.quantity);
                        } else setValue("void_quantity", ++void_quantity);
                      }}
                    >
                      +
                    </button>
                  </div>

                  {errors.void_quantity && (
                    <span className="text-xs text-red-700 mt-1 font-semibold">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="font-medium mb-2">User</label>
                  <select
                    {...register("user_id", { required: true })}
                    className="intro-x login__input form-control py-3 px-4 block capitalize"
                  >
                    {users
                      ? users?.map((user) => (
                          <option value={user.id} className="capitalize">
                            {" "}
                            {user.name}
                          </option>
                        ))
                      : ""}
                  </select>
                  {errors.user_id && (
                    <span className="text-xs text-red-700 mt-1 font-semibold">
                      This field is required
                    </span>
                  )}
                </div>

                {/* PASSWORD  */}
                <div className="form-control">
                  <label className="font-medium mb-2">Password</label>
                  <div className="flex flex-row gap-2">
                    <input
                      type="password"
                      {...register("password", { required: true })}
                      className="input input-bordered input-md w-full "
                    />
                  </div>
                  {errors.password && (
                    <span className="text-xs text-red-700 mt-1 font-semibold">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
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
          <button type="submit" className="btn btn-primary btn-md flex-1 ml-2">
            Void Item
          </button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

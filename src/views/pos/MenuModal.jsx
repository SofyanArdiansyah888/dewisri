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

export default function MenuModal({
  setMenuModal,
  menuModal,
  setSelectedMenus,
  selectedMenus,
  selectedMenu,
  selectedDefaultMenus,
}) {
  const [selectedDefaultMenu, setSelectedDefaultMenu] = useState();
  const schema = yup.object({
    quantity: yup.number().min(1).required(),
    // description: yup.string().required(),
    // void_reason: yup.string().when('quantity',{
    //   is: val => val < selectedDefaultMenu?.quantity,
    //   then: yup.string().required()
    // })
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    watch,
    setError,
    trigger
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  

  useEffect(() => {
    setValue("product_name", selectedMenu?.product_name);
    setValue("item_price", selectedMenu?.item_price);
    setValue("quantity", selectedMenu?.quantity);
    setValue("variant_name", selectedMenu?.variant_name);
    setValue("description", selectedMenu?.description);
    setValue("variant_id", selectedMenu?.variant_id);
    setValue("product_id", selectedMenu?.product_id);
    // setValue("void_reason", selectedMenu?.void_reason);

    let temp = selectedDefaultMenus.find((defaultMenu) => {
      return (
        defaultMenu.product_id === selectedMenu.product_id &&
        defaultMenu.variant_id === selectedMenu.variant_id
      );
    });
    setSelectedDefaultMenu(temp);
  }, [selectedMenu]);

  const quantityWatch = watch('quantity')
  
  
  const onSubmit = (data) => {
    let temp = selectedMenus.map((menu) => {
      if (
        menu.product_id === data.product_id &&
        menu.variant_id === data.variant_id
      ) {
        menu.quantity = data.quantity;
        menu.description = data.description ?? "";
        // if(data.void_reason){
        //     menu.void_reason = data.void_reason
        //     menu.void_quantity =  selectedMenu.quantity - selectedDefaultMenu.quantity
        // }
      }
      return menu;
    });

    setSelectedMenus(temp);

    reset();
    setMenuModal(false);
  };

  return (
    <Modal
      show={menuModal}
      onHidden={() => setMenuModal(false)}
      size="modal-lg"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>
          <h2 className="font-medium text-base mr-auto">
            {selectedMenu?.product_name}
          </h2>
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
                <div className="form-control">
                  <label className="font-medium mb-2">Nama Variant</label>
                  <input
                    type="text"
                    {...register("variant_name", { required: true })}
                    className="input input-bordered input-md w-full bg-slate-50 "
                    disabled
                  />
                  {errors.variant_name && (
                    <span className="text-xs text-red-700 mt-1 font-semibold">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="font-medium mb-2">Harga Item</label>
                  <input
                    type="text"
                    {...register("item_price", { required: true })}
                    className="input input-bordered input-md w-full bg-slate-50"
                    disabled
                  />
                  {errors.item_price && (
                    <span className="text-xs text-red-700 mt-1 font-semibold">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="font-medium mb-2">Jumlah</label>
                  <div className="flex flex-row gap-2">
                    <input
                      type="number"
                      {...register("quantity", { required: true })}
                      className="input input-bordered input-md w-full "
                    />
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        let quantity = getValues("quantity");
                        --quantity;
                        if (quantity < 1) {
                          quantity = 1;
                        }
                        setValue("quantity", quantity);
                      }}
                    >
                      -
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        let quantity = getValues("quantity");
                        setValue("quantity", ++quantity);
                      }}
                    >
                      +
                    </button>
                  </div>

                  {errors.quantity && (
                    <span className="text-xs text-red-700 mt-1 font-semibold">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="font-medium mb-2">Catatan Pelanggan</label>
                  <textarea
                    {...register("description", { required: true })}
                    className="textarea textarea-bordered w-full "
                  ></textarea>
                  {errors.description && (
                    <span className="text-xs text-red-700 mt-1 font-semibold">
                      This field is required
                    </span>
                  )}
                </div>

                {/* {(quantityWatch < selectedDefaultMenu?.quantity) && (
                  <div className="form-control">
                    <label className="font-medium mb-2">Alasan Void</label>
                    <textarea
                      {...register("void_reason", { required: true })}
                      className="textarea textarea-bordered w-full "
                    ></textarea>
                    {errors.void_reason && (
                      <span className="text-xs text-red-700 mt-1 font-semibold">
                        This field is required
                      </span>
                    )}
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="text-right">
          <button
            type="button"
            className="btn  btn-md flex-1  btn-outline "
            onClick={() => setMenuModal(false)}
          >
            Kembali
          </button>
          <button type="submit" className="btn btn-primary btn-md flex-1 ml-2">
            Simpan
          </button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

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
const schema = yup.object({
  quantity: yup.number().min(1).required(),
  description: yup.string().required(),
});
export default function VariantModal({
  setVariantModal,
  variantModal,
  setSelectedMenus,
  selectedMenus,
  selectedProduct,
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
  const [selectedVariant, setSelectedVariant] = useState();

  console.log(selectedMenus, "selectedMenus");
  useEffect(() => {
    setValue("product_name", selectedProduct?.name);
    setValue("item_price", selectedProduct?.price);
    setValue("quantity", 1);
  }, [selectedProduct]);

  const onSubmit = (data) => {
    if (selectedVariant) {
      let isExist = selectedMenus.some((menu) => {
        return (
          menu.product_id === selectedProduct.id &&
          menu.variant_id === selectedVariant.id
        );
      });
      if (isExist) {
        let temp = selectedMenus.map((menu) => {
          if (
            menu.product_id === selectedProduct.id &&
            menu.variant_id === selectedVariant.id
          ) {
            menu.quantity += data.quantity;
            menu.description += ", " + data.description;
          }
          return menu;
        });
        setSelectedMenus(temp);
      } else {
        setSelectedMenus([
          ...selectedMenus,
          {
            product_id: selectedProduct.id,
            product_name: selectedProduct.name,
            variant_id: selectedVariant?.id,
            variant_name: selectedVariant?.name,
            quantity: data.quantity,
            item_price: data.item_price,
            description: data.description,
            created_at: null,
          },
        ]);
      }
    } else {
      let isExist = selectedMenus.some((menu) => {
        return menu.product_id === selectedProduct.id;
      });
      if (isExist) {
        let temp = selectedMenu.map((menu) => {
          if (menu.product_id === selectedProduct.id) {
            menu.quantity += data.quantity;
            menu.description += ", " + data.description;
          }
          return menu;
        });
        setSelectedMenus(temp);
      } else {
        setSelectedMenus([
          ...selectedMenus,
          {
            product_id: selectedProduct.id,
            product_name: selectedProduct.name,
            variant_id: "",
            variant_name: "",
            quantity: data.quantity,
            item_price: data.item_price,
            description: data.description,
            created_at: null,
          },
        ]);
      }
    }
    reset();
    setVariantModal(false);
  };

  const handleSelectVariant = (variant) => {
    setValue("item_price", variant.price);
    setSelectedVariant(variant);
  };
  return (
    <Modal
      show={variantModal}
      onHidden={() => setVariantModal(false)}
      size="modal-lg"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>
          <h2 className="font-medium text-base mr-auto">
            {selectedProduct?.name}
          </h2>
        </ModalHeader>
        <ModalBody>
          <div className="col-span-12">
            <div className="m-4 flex flex-row gap-3">
              {selectedProduct?.variants?.length > 0 && (
                <div className="flex-1">
                  <div className="form-control">
                    <label className="font-semibold">Pilih Variant</label>
                    {selectedProduct?.variants?.map((variant) => (
                      <div
                        onClick={() => handleSelectVariant(variant)}
                        className={`box ${
                          selectedVariant?.id === variant.id
                            ? "bg-info"
                            : "bg-gray-100"
                        } w-full h-[50px] mt-2 rounded-md text-center pt-2 text-xl`}
                      >
                        {variant.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                        setValue("quantity",quantity);
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
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="text-right">
          <button
            type="button"
            className="btn  btn-md flex-1  btn-outline "
            onClick={() => setVariantModal(false)}
          >
            Kembali
          </button>
          <button type="submit" className="btn btn-primary btn-md flex-1 ml-2">
            Tambah Item
          </button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

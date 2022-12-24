import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useUnpaidPayments } from "../../hooks/usePayments";
import CustomerInfo from "./CustomerInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { formatRupiah } from "../../utils/formatter";
import { useCreateSplitBill, useSplitBill } from "../../hooks/useSplitBill";
import { useEffect } from "react";
import { useError } from "../../hooks/useError";
// const schema = yup.object({
//   customer_id: yup.nullable(true),
// });
function Main() {
  const { tableId, orderId } = useParams();
  const navigate = useNavigate();
  const { setErrorMessage } = useError();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    getValues,
    setValue,
  } = useForm({
    mode: "onChange",
    // resolver: yupResolver(schema),
    defaultValues: {
      customer_id: "",
      table_id: "",
      subtotal: "",
      total: "",
      tax_ppn: "",
      tax_service: "",
      order_id: "",
      products: [],
    },
  });
  const { fields, append, replace } = useFieldArray({
    control,
    name: "products",
  });
  useSplitBill(orderId, (data) => {
    if (data?.id) {
      navigate(`/meja/${tableId}/order/${orderId}/payment`);
    }
  });
  const [discount, setDiscount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const temp = queryParams.get("discount");
    if (temp) setDiscount(temp);
    else setDiscount(0);
  }, [location]);

  useUnpaidPayments(
    (data) => {
      reset();

      setValue("customer_id", data?.customer?.id);
      setValue("table_id", data?.table?.id);
      setValue("subtotal", data?.subtotal);
      setValue("total", data?.total);
      setValue("tax_ppn", data?.tax_ppn);
      setValue("tax_service", data?.tax_service);
      setValue("order_id", data?.order_id);
      setValue("discount", discount);
      data?.order_product?.map((product) =>
        append({
          ...product,
          quantity: product.quantity - product.void_quantity,
          selected: false,
        })
      );
      // setData(data);
      // setTotalPembayaran(data?.total);
    },
    {
      order_id: orderId,
      table_id: tableId,
    }
  );

  const { mutate: createSplitBill, isLoading } = useCreateSplitBill(() => {
    navigate(`/meja/${tableId}/order/${orderId}/payment`);
  });

  const handleSimpan = (data) => {
    let products = data.products.filter((product) => product.selected);
    if (products.length === 0) {
      setErrorMessage("Silahkan Pilih Produk Terlebih Dahulu");
      return;
    }
    data.products = products;
    createSplitBill({
      ...data,
    });
  };
  return (
    <>
      <form className="validate-form" onSubmit={handleSubmit(handleSimpan)}>
        <div className="intro-y  flex flex-col sm:flex-row justify-between mt-8 gap-2">
          <h2 className="text-lg font-medium mr-auto">Split Bill</h2>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate(`/meja/${tableId}/pos`)}
          >
            Kembali
          </button>
          {/* <Link to="/meja"> */}
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            Payment
          </button>
          {/* </Link> */}
        </div>

        <div className="intro-y  mt-5 overflow-y-auto max-h-[72vh] w-full">
          <table className="table table-report">
            <thead>
              <tr>
                <th>Pilih</th>
                <th>Produk</th>
                <th>Variant</th>
                <th>Jumlah</th>
                {/* <th>Jumlah Void</th> */}
                <th>Harga</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <>
                  {field.quantity - field.void_quantity > 0 && (
                    <tr key={field.id}>
                      <td>
                        <input
                          type="checkbox"
                          {...register(`products[${index}].selected`)}
                        />
                      </td>
                      <td>{field.product_name}</td>
                      <td>{field.variant_name ?? "-"}</td>
                      <td>
                        <input
                          className="w-[100px]"
                          type="number"
                          {...register(`products[${index}].quantity`)}
                        />
                        <button
                          className="btn btn-primary ml-2"
                          type="button"
                          onClick={() => {
                            let quantity = getValues(
                              `products[${index}].quantity`
                            );
                            --quantity;
                            if (quantity < 1) {
                              setValue(`products[${index}].quantity`, 1);
                            } else {
                              setValue(`products[${index}].quantity`, quantity);
                            }
                          }}
                        >
                          -
                        </button>
                        <button
                          className="btn btn-secondary ml-2"
                          type="button"
                          onClick={() => {
                            let quantity = getValues(
                              `products[${index}].quantity`
                            );
                            ++quantity;
                            if (quantity > field.quantity) {
                              setValue(
                                `products[${index}].quantity`,
                                field.quantity
                              );
                            } else {
                              setValue(`products[${index}].quantity`, quantity);
                            }
                          }}
                        >
                          +
                        </button>
                      </td>
                      {/* <td>{field.void_quantity}</td> */}
                      <td>{formatRupiah(field.item_price, "Rp.")}</td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </>
  );
}

export default Main;

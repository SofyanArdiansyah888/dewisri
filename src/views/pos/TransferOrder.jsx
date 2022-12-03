import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useOrderTable, useTransferOrder } from "../../hooks/useOrderTable";
import { useOrderedTables } from "../../hooks/useTable";


const schema = yup.object({
  table_id: yup.string().required(),
});
function TransferOrder() {
  const { data: orderedTables } = useOrderedTables();
  let { id } = useParams();

  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues:{
      products:[]
    }
  });
  const { fields, append } = useFieldArray(
    {
      control,
      name: "products"
    }
  );
  
    
  const handleGetData = (data) => {
    reset()
    data?.products?.map((item) => {
      append({
        "product_id": item.id,
        "product_name": item.pivot.product_name,
        "variant_id": item.pivot.variant_id,
        "variant_name": item.pivot.variant_name,
        "quantity": item.pivot.quantity,
        "item_price": item.pivot.item_price,
        'description': item.pivot.description,
        'created_at': item.pivot.created_at,
        'selected' : false
      })
      return item;
    })
    
  }

  const { data: tableOrder } = useOrderTable(id,handleGetData);
  const {mutate:transferOrder} = useTransferOrder((data) => {
    const isSelectedAll = data.products.every((product) => product.selected );
    if(isSelectedAll){
      navigate(`/meja`)
    }else{
      navigate(`/meja/${id}/pos`)
    }
  })
  
  const handleSimpan = (data) => {  
    transferOrder({
      ...data,
      order_id: tableOrder?.id,
      old_table_id: tableOrder.table_id
    })
    
  }

  return (
    <>
      <form className="validate-form" onSubmit={handleSubmit(handleSimpan)}>
        
        <div className="intro-y flex items-center mt-8">
          <h2 className="text-lg font-medium mr-auto">Transfer Order</h2>
        </div>
        <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="intro-y col-span-12 lg:col-span-4">
            {/* BEGIN: Form Layout */}
            <div className="intro-y box p-5">
              <div >
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
                  {orderedTables?.map((table) => (
                    <option key={table.id} value={table.id}>{table.name}</option>
                  ))}
                </select>
                {errors.table_id && (
                  <div className="text-danger mt-2">
                    {errors.table_id.message}
                  </div>
                )}
              </div>
              <div className="text-right mt-5">
                <button
                  type="button"
                  className="btn btn-outline-secondary w-24 mr-1"
                  onClick={() => navigate(`/meja/${id}/pos`)}
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  className="btn btn-primary w-24 mr-1"
                >
                  Simpan
                </button>
              </div>
            </div>
            {/* END: Form Layout */}
          </div>

          <div className="intro-y col-span-12  overflow-auto bg-white px-4 pb-4">
            <table className="table table-report">
              <thead>
                <tr>
                  <th>Pilih</th>
                  <th className="whitespace-nowrap">Nama Produk</th>
                  <th className="whitespace-nowrap">Harga</th>
                  <th className="text-center whitespace-nowrap">
                    Jumlah
                  </th>
                  <th className="text-center whitespace-nowrap">Variant</th>
                  <th className="text-center whitespace-nowrap">Deskripsi</th>
                </tr>
              </thead>
              <tbody>
                {
                  fields?.map((field, index) => <>
                    <tr>
                      <td><input type="checkbox" {...register(`products[${index}].selected`)}   /></td>
                      <td>{field.product_name}</td>
                      <td>{field.item_price}</td>
                      <td>{field.quantity}</td>
                      <td>{field?.variant_name ?? "-"}</td>
                      <td>{field.description}</td>
                    </tr>
                  </> )
                }
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </>
  );
}

export default TransferOrder;

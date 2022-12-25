import {
    LoadingIcon,
    Lucide,
    Modal,
    ModalBody,
    ModalHeader
} from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useCreateCustomer, useCustomers } from "../../hooks/useCustomer";
import { useUpdateTables } from "../../hooks/useTable";


const schema = yup.object({
  name: yup.string().required().min(2),
  // email: yup.string().email(),
  // phone: yup.string(),
  pax: yup.number().required().min(1).typeError('Pax required')
});

function CustomerModal({
  modal,
  setModal,
  setSelectedCustomer,
  selectedCustomer,
  selectedTable,
}) {
  const { data, loading } = useCustomers();
  const queryClient = useQueryClient();


  const [search, setSearch] = useState("");

  const {mutate:updateTable, isLoading:isUpdateTable} = useUpdateTables(() => {
    reset()
    setModal(false);
  });

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

  const filterData = () => {
    return data?.filter(
      (item) =>
        item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        item.phone.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        item.email.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  };

  const handleCreate = (data) => {

    updateTable({
      ...data,
      status: 'OPEN',
      id: selectedTable.id
    })

    
  };

  return (
    <>
      <Modal
        show={modal}
        onHidden={() => {
          setModal(false);
        }}
        size="modal-xl"
      >
        <ModalHeader>
          <h2 className="font-medium text-base mr-auto">Pilih Customer</h2>
          <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap justify-end mt-2">
              <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
                <div className="w-56 relative text-slate-500">
                  <input
                    type="text"
                    className="form-control w-56 box pr-10"
                    placeholder="Search..."
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Lucide
                    icon="Search"
                    className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
                  />
                </div>
              </div>
            </div>
        </ModalHeader>
        <ModalBody className="bg-gray-50">
          <div className="grid grid-cols-12 gap-6  max-h-[500px] overflow-y-auto ">
       

            <div className="col-span-6 box h-auto max-h-[550px] p-8">
              <form
                className="validate-form"
                onSubmit={handleSubmit(handleCreate)}
              >
                <input type="hidden" {...register("customer_id")} />
                <h2 className="intro-y text-lg font-medium ">
                  Form Tambah Customer
                </h2>
                <div className="mt-4">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    {...register("name")}
                    className={classNames({
                      "form-control": true,
                      "border-danger": errors.name,
                    })}
                    name="name"
                    id="name"
                    type="text"
                  />
                  {errors.name && (
                    <div className="text-danger mt-2">
                      {errors.name.message}
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    className={classNames({
                      "form-control": true,
                      "border-danger": errors.email,
                    })}
                    id="email"
                    name="email"
                    type="text"
                  />
                  {errors.email && (
                    <div className="text-danger mt-2">
                      {errors.email.message}
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    {...register("phone")}
                    className={classNames({
                      "form-control": true,
                      "border-danger": errors.phone,
                    })}
                    name="phone"
                    id="phone"
                    type="text"
                  />
                  {errors.phone && (
                    <div className="text-danger mt-2">
                      {errors.phone.message}
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <label htmlFor="pax" className="form-label">
                    Pax
                  </label>
                  <input
                    {...register("pax")}
                    className={classNames({
                      "form-control": true,
                      "border-danger": errors.pax,
                    })}
                    name="pax"
                    id="pax"
                    type="number"
                  />
                  {errors.pax && (
                    <div className="text-danger mt-2">
                      {errors.pax.message}
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <button className="btn btn-primary" disabled={isUpdateTable}>Submit</button>
                  
                <a className="btn btn-secondary ml-2" onClick={() => setModal(false)}>Kembali</a>
                  
                </div>
              </form>
            </div>
            {/* CUSTOMER */}
            <div className="col-span-6">
              {loading && (
                <div className="col-span-12 mt-12  flex flex-col justify-end items-center">
                  <LoadingIcon icon="circles" className="w-16 h-16" />
                </div>
              )}

              {filterData()?.map((customer, key) => (
                <div key={key} className="intro-y col-span-6">
                  <div className="box mb-4">
                    <div className="flex flex-col lg:flex-row items-center p-5">
                      <div className="w-24 h-24 lg:w-12 lg:h-12 image-fit lg:mr-1">
                        <div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                          <span className="font-medium text-gray-600 dark:text-gray-300">
                            {customer.name
                              ? customer.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join(".")
                                  .toUpperCase()
                              : ""}
                          </span>
                        </div>
                      </div>
                      <div className="lg:ml-2 lg:mr-auto text-center lg:text-left mt-3 lg:mt-0">
                        <a href="" className="font-medium capitalize">
                          {customer.name}
                        </a>
                        <div className="text-slate-500 text-xs mt-0.5">
                          {customer.phone ? customer.phone : "-"}
                        </div>
                      </div>
                      <div className="flex mt-4 lg:mt-0">
                        <button
                          className="btn btn-primary py-1 px-2 mr-2"
                          onClick={() => {
                            setValue("customer_id", customer.id);
                            setValue("name", customer.name);
                            setValue("email", customer.email);
                            setValue("phone", customer.phone);
                            setSelectedCustomer(customer)
                            // setModal(false)
                          }}
                        >
                          Pilih
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default CustomerModal;

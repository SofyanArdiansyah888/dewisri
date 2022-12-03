import { LoadingIcon, Lucide, Litepicker } from "@/base-components";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useCustomers } from "../../../hooks/useCustomer";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFreeTables } from "../../../hooks/useTable";
import { useCreateReservation } from "../../../hooks/useReservation";
import { useQueryClient } from "react-query";
import {Link, useNavigate} from 'react-router-dom'
// import DateTimePicker from 'react-datetime-picker'

const schema = yup.object({
  name: yup.string().required().min(2),
  email: yup.string().email(),
  phone: yup.string(),
  reservation_date: yup.string().required(),
  table_id: yup.string().required("Table is required"),
});

function Create() {
  const { data, loading } = useCustomers();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {mutate} = useCreateReservation((data) => {
    queryClient.invalidateQueries(["reservations"]);
    navigate("/reservasi");
  });
  const { data: tables } = useFreeTables();
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    setValue("reservation_date", date);
    return () => {};
  }, [date]);

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
    mutate({ ...data });
  };

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Reservasi Meja</h2>

      <div className="grid grid-cols-12 gap-6 mt-5">
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

        <div className="col-span-6 box h-auto p-8">
          <form className="validate-form" onSubmit={handleSubmit(handleCreate)}>
            <input type="hidden" {...register("customer_id")} />
            <h2 className="intro-y text-lg font-medium ">Form Reservasi</h2>
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
                <div className="text-danger mt-2">{errors.name.message}</div>
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
                <div className="text-danger mt-2">{errors.email.message}</div>
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
                <div className="text-danger mt-2">{errors.phone.message}</div>
              )}
            </div>
            <div className="mt-4">
              <input
                {...register("reservation_date")}
                value={date}
                type="hidden"
              />
              <label htmlFor="modal-datepicker-1" className="form-label">
                Tanggal Reservasi
              </label>

              {/* <DateTimePicker onChange={setDate} value={date} /> */}

              <Litepicker
                value={date}
                onChange={setDate}
                options={{
                  format: "DD MMMM YYYY",
                  autoApply: true,
                  showWeekNumbers: false,

                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }}
                className="form-control"
              />

              {errors.reservation_date && (
                <div className="text-danger mt-2">
                  {errors.reservation_date.message}
                </div>
              )}
            </div>
            <div className="mt-4">
              <label htmlFor="table" className="form-label">
                Meja
              </label>
              <select
                {...register("table_id")}
                className={classNames({
                  "form-control": true,
                  "border-danger": errors.table_id,
                })}
                name="table_id"
                id="table"
              >
                <option value="">Pilih Meja</option>
                {tables?.map((table) => (
                  <option value={table.id}>{table.name}</option>
                ))}
              </select>
              {errors.table_id && (
                <div className="text-danger mt-2">
                  {errors.table_id.message}
                </div>
              )}
            </div>
            <div className="mt-4">
              <button className="btn btn-primary">Submit</button>
              <Link to="/reservasi"><a className="btn btn-secondary ml-2">Kembali</a></Link>
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
                        setValue("customer_id", customer.id);
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
    </>
  );
}

export default Create;

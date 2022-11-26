import { Lucide, LoadingIcon } from "@/base-components";
import { useState } from "react";
import { useReservation } from "../../../hooks/useReservation";
import EmptyData from "../../../components/EmptyData";
import { Link } from "react-router-dom";
import { helper } from "../../../utils/helper";

function Main() {
  const [modal, setModal] = useState(false);
  const [modalEdit, setmodalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [setselectedReservation, setsetselectedReservation] = useState();

  const { loading, data } = useReservation();
  const [search, setSearch] = useState("");

  const handleEdit = (reservation) => {
    setsetselectedReservation(reservation);
    setmodalEdit(true);
  };

  const handleDelete = (reservation) => {
    setsetselectedReservation(reservation);
    setModalDelete(true);
  };

  const filterData = () => {
    return data?.filter((item) =>
      item.reservation_number
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase())
    );
  };

  return (
    <>
      <h2 className="intro-y text-lg font-light mt-10">Reservasi</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap justify-between mt-2">
          <div>
            <Link to="/reservasi/create">
              <button className="btn btn-primary shadow-md mr-2">
                Tambah Reservasi
              </button>
            </Link>

            <Link to="/meja">
              <button className="btn btn-secondary shadow-md mr-2">
                Kembali
              </button>
            </Link>
          </div>

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
        {/* BEGIN: Data List */}

        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
          {filterData()?.length === 0 || !filterData() ? (
            <EmptyData />
          ) : (
            <table className="table table-report -mt-2">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">Nomor Reservasi</th>
                  <th className="whitespace-nowrap">Client</th>
                  <th className="whitespace-nowrap">Meja</th>
                  <th className="whitespace-nowrap">Status</th>
                  <th className="whitespace-nowrap">Tanggal Reservasi</th>
                  <th className="text-center whitespace-nowrap">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <div className="col-span-12 mt-12  flex flex-col justify-end items-center">
                    <LoadingIcon icon="circles" className="w-16 h-16" />
                  </div>
                )}
                {filterData()?.map((reservation, key) => (
                  <tr key={key} className="intro-x">
                    <td>
                      <a href="" className="font-light whitespace-nowrap">
                        {reservation.reservation_number}
                      </a>
                    </td>
                    <td>
                      <a href="" className="font-light whitespace-nowrap">
                        {reservation.reservation_number}
                      </a>
                    </td>
                    <td>
                      <a href="" className="font-light whitespace-nowrap">
                        {reservation.reservation_number}
                      </a>
                    </td>
                    <td>
                      <a href="" className="font-light whitespace-nowrap">
                        {reservation.status}
                      </a>
                    </td>
                    <td>
                      <a href="" className="font-light whitespace-nowrap">
                        {helper.formatDate(
                          reservation.reservation_date,
                          "DD MMMM YYYY"
                        )}
                      </a>
                    </td>
                    <td className="table-report__action w-56">
                      <div className="flex justify-center items-center">
                        <a
                          className="flex items-center text-danger"
                          href="#"
                          onClick={() => handleDelete(reservation)}
                        >
                          <Lucide icon="XSquare" className="w-4 h-4 mr-1" />{" "}
                          Cancel
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* END: Data List */}
        {/* BEGIN: Pagination */}
        {/* {categories.length > 10 ? (
          <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
            <nav className="w-full sm:w-auto sm:mr-auto">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#">
                    <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    <Lucide icon="ChevronLeft" className="w-4 h-4" />
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    ...
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    ...
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    <Lucide icon="ChevronRight" className="w-4 h-4" />
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    <Lucide icon="ChevronsRight" className="w-4 h-4" />
                  </a>
                </li>
              </ul>
            </nav>
            <select className="w-20 form-select box mt-3 sm:mt-0">
              <option>10</option>
              <option>25</option>
              <option>35</option>
              <option>50</option>
            </select>
          </div>
        ) : (
          ""
        )} */}
        {/* END: Pagination */}
      </div>
    </>
  );
}

export default Main;

import { Lucide } from "@/base-components";
import { useEffect, useState } from "react";
import { useCategory } from "../../hooks/useCategory";
import api from "../../services/api";
import CreateModal from "./CreateModal";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";

function Main() {
  const [modal, setModal] = useState(false);
  const [modalEdit, setmodalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedPrinter, setselectedPrinter] = useState();
  const [printers, setPrinters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const {data: categories} = useCategory()

  useEffect(() => {
    getPrinters();
  }, []);

  useEffect(() => {
    isChanged && getPrinters();
  }, [isChanged]);

  async function getPrinters() {
    setLoading(true);
    let response = await api.get("printers");
    setPrinters(response.data);
    setLoading(false);
    setIsChanged(false);
  }

  const handleEdit = (printer) => {
    setselectedPrinter(printer);
    setmodalEdit(true);
  };

  const handleDelete = (printer) => {
    setselectedPrinter(printer);
    setModalDelete(true);
  };
  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Printer</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap justify-between mt-2">
          <button
            className="btn btn-primary shadow-md mr-2"
            onClick={() => setModal(true)}
          >
            Tambah Printer
          </button>

          <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
            <div className="w-56 relative text-slate-500">
              <input
                type="text"
                className="form-control w-56 box pr-10"
                placeholder="Search..."
              />
              <Lucide
                icon="Search"
                className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
              />
            </div>
          </div>
        </div>
        {/* BEGIN: Data List */}
        <div className="intro-y col-span-12 overflow-auto ">
          <table className="table table-report -mt-2">
            <thead>
              <tr>
                <th className="whitespace-nowrap">Printer</th>
                <th className="whitespace-nowrap">Deskripsi</th>
                <th className="whitespace-nowrap">IP ADDRESS</th>
                <th className="whitespace-nowrap">Kategori</th>
                <th className="whitespace-nowrap">Kasir</th>
                <th className="text-center whitespace-nowrap">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ?? (
                <div className="col-span-12 mt-12  flex flex-col justify-end items-center">
                  <LoadingIcon icon="circles" className="w-16 h-16" />
                </div>
              )}
              {printers.map((printer, key) => (
                <tr key={key} className="intro-x">
                  <td>
                    <a href="" className="font-medium whitespace-nowrap">
                      {printer.name}
                    </a>
                  </td>
                  <td>
                    <a href="" className="font-medium whitespace-nowrap">
                      {printer.description}
                    </a>
                  </td>
                  <td>
                    <a href="" className="font-medium whitespace-nowrap">
                      {printer.ip_address}
                    </a>
                  </td>

                  <td>
                    <a href="" className="font-medium whitespace-nowrap">
                      {printer.category_name}
                    </a>
                  </td>

                  <td>
                    <a href="" className="font-medium whitespace-nowrap">
                      {printer.cashier == true ? "Ya" : "Tidak"}
                    </a>
                  </td>

                  {/* ACTION BUTTONS */}
                  <td className="table-report__action w-56">
                    <div className="flex justify-center items-center">
                      <a
                        className="flex items-center mr-3"
                        href="#"
                        onClick={() => handleEdit(printer)}
                      >
                        <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />{" "}
                        Edit
                      </a>
                      <a
                        className="flex items-center text-danger"
                        href="#"
                        onClick={() => handleDelete(printer)}
                      >
                        <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* END: Data List */}
        {/* BEGIN: Pagination */}
        {printers.length > 10 ? (
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
        )}
        {/* END: Pagination */}
        <CreateModal
          modal={modal}
          setModal={setModal}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
        />
        <UpdateModal
          modal={modalEdit}
          setModal={setmodalEdit}
          printer={selectedPrinter}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
        />
        <DeleteModal
          modal={modalDelete}
          setModal={setModalDelete}
          printer={selectedPrinter}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
        />
      </div>
    </>
  );
}

export default Main;

import { Lucide } from "@/base-components";
import { useEffect, useState } from "react";
import api from "../../services/api";
import UpdateModal from "./UpdateModal";
import { BrowserRouter as Router } from "react-router-dom";
import EmptyData from "../../components/EmptyData";
function Main() {
  const [modal, setModal] = useState(false);
  const [modalEdit, setmodalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedTaxes, setselectedTaxes] = useState();
  const [taxes, setTaxes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const { history } = Router;

  useEffect(() => {
    getTaxes();
  }, []);

  useEffect(() => {
    isChanged && getTaxes();
  }, [isChanged]);

  async function getTaxes() {
    setLoading(true);
    let response = await api.get("taxes");
    setTaxes(response.data);
    setLoading(false);
    setIsChanged(false);
  }

  const handleEdit = (printer) => {
    setselectedTaxes(printer);
    setmodalEdit(true);
  };

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Pajak</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap justify-between mt-2"></div>
        {/* BEGIN: Data List */}
        <div className="intro-y col-span-12 overflow-auto ">
          {taxes?.length === 0 || !taxes ? (
            <EmptyData />
          ) : (
            <table className="table table-report -mt-2">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">Nama</th>
                  <th className="whitespace-nowrap">Deskripsi</th>
                  <th className="whitespace-nowrap">Jumlah (%)</th>
                  <th className="text-center whitespace-nowrap">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {loading ?? (
                  <div className="col-span-12 mt-12  flex flex-col justify-end items-center">
                    <LoadingIcon icon="circles" className="w-16 h-16" />
                  </div>
                )}
                {taxes.map((printer, key) => (
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
                        {printer.amount}
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
        {taxes.length > 10 ? (
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

        <UpdateModal
          modal={modalEdit}
          setModal={setmodalEdit}
          tax={selectedTaxes}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
        />
      </div>
    </>
  );
}

export default Main;

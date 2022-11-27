import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Lucide,
} from "@/base-components";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { useTables, useUpdateTables } from "../../hooks/useTable";
import api from "../../services/api";
import { formatRupiah, secondToHourMinute } from "../../utils/formatter";
import CreateModal from "./CreateModal";
import DeleteModal from "./DeleteModal";
import ReservasiModal from "./ReservasiModal";
import UpdateModal from "./UpdateModal";

function Main() {
  const [modal, setModal] = useState(false);
  const [modalEdit, setmodalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [search, setSearch] = useState("");

  const queryClient = useQueryClient();

  const updateMutation = useUpdateTables(() => {
    queryClient.invalidateQueries({ queryKey: ["tables"] });
  });

  const { loading, data } = useTables();

  const [selectedTable, setSelectedTable] = useState();
  const [tables, setTables] = useState([]);

  const [reservedStep, setReservedStep] = useState(0);
  const [reservedModal, setReservedModal] = useState(false);

  useEffect(() => {
    if (reservedStep === 2) {
      setReservedModal(true);
    }
    if (reservedStep === 3) {
      setReservedStep(0);
    }
    if (reservedStep === 1) {
      let temp = tables.map((table) => {
        table.isChoosen = false;
        return table;
      });
      setTables(temp);
    }
  }, [reservedStep]);

  const handleEdit = (table) => {
    setSelectedTable(table);
    setmodalEdit(true);
  };

  const handleDelete = (table) => {
    setSelectedTable(table);
    setModalDelete(true);
  };

  const handleUpdateStatus = (status, id) => {
    updateMutation.mutate({
      id,
      data: { status },
    });
  };

  const handleReservation = () => {
    setReservedStep((step) => step + 1);
  };
  const handleChooseTable = (table) => {
    const temp = tables.map((tempTable) => {
      if (tempTable.id === table.id) {
        return { ...tempTable, isChoosen: !tempTable.isChoosen };
      }
      return tempTable;
    });
    setTables(temp);
  };

  const filterData = () => {
    return data?.filter((item) =>
      item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  };
  return (
    <>
      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-12 lg:col-span-3 2xl:col-span-2">
          <h2 className="intro-y text-lg font-medium mr-auto mt-2">
            List Meja
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-12 ">
          {/* SEARCH */}
          <div className="intro-y flex flex-col-reverse sm:flex-row items-center">
            <div className="w-full sm:w-auto relative mr-auto mt-3 sm:mt-0">
              <Lucide
                icon="Search"
                className="w-4 h-4 absolute my-auto inset-y-0 ml-3 left-0 z-10 text-slate-500"
              />
              <input
                type="text"
                className="form-control w-full sm:w-64 box px-10"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-auto flex">
              <button
                className="btn btn-primary shadow-md mr-2"
                onClick={() => setModal(true)}
              >
                Tambah Meja
              </button>
              <Link to="/reservasi">
                <button className="btn btn-primary shadow-md mr-2">
                  Reservasi
                </button>
              </Link>
            </div>
          </div>

          {/* LIST MEJA  */}
          <div className="intro-y grid grid-cols-12 gap-3 sm:gap-6 mt-5 ">
            {filterData()?.map((table, index) => (
              <div
                key={index}
                className="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-3"
              >
                <div className="file box rounded-md px-5 pt-8 pb-5  relative zoom-in ">
                  <div className="block font-light mt-4 text-left truncate">
                    Waktu : {secondToHourMinute(table?.order?.diff_time ?? 0)}
                    <br />
                    Total Belanja :{" "}
                    {formatRupiah(table?.order?.total_payment, "Rp.")}
                  </div>
                  <div className="flex justify-end mt-4">
                    {(table.status === "ORDERED" ||
                      table.status === "OPEN") && (
                      <Link to={`/meja/${table.id}/pos`}>
                        <a className="btn btn-info mr-2">ORDER</a>
                      </Link>
                    )}
                    <Dropdown>
                      {table.status === "OPEN" && (
                        <DropdownToggle className="btn btn-success text-white">
                          BUKA
                        </DropdownToggle>
                      )}

                      {table.status === "CLOSED" && (
                        <DropdownToggle className="btn btn-danger">
                          TUTUP
                        </DropdownToggle>
                      )}

                      {table.status === "RESERVED" && (
                        <DropdownToggle className="btn btn-warning">
                          RESERVASI
                        </DropdownToggle>
                      )}

                      {table.status === "ORDERED" && (
                        <button className="btn btn-primary">
                          MENGORDER
                        </button>
                      )}
                      <DropdownMenu className="w-40">
                        <DropdownContent>
                          {table.status !== "OPEN" && (
                            <DropdownItem
                              onClick={() =>
                                handleUpdateStatus("OPEN", table.id)
                              }
                            >
                              BUKA
                            </DropdownItem>
                          )}
                          {table.status !== "CLOSED" && (
                            <DropdownItem
                              onClick={() =>
                                handleUpdateStatus("CLOSED", table.id)
                              }
                            >
                              TUTUP
                            </DropdownItem>
                          )}
                        </DropdownContent>
                      </DropdownMenu>
                    </Dropdown>
                  </div>

                  <div className="absolute top-0 left-2 ml-2 mt-3 ml-aut text-lg font-semibold">
                    {table.name}
                  </div>
                </div>
                <Dropdown className="absolute top-0 right-0 mr-2 mt-3 ml-auto">
                  <DropdownToggle tag="a" className="w-5 h-5 block" href="#">
                    <Lucide
                      icon="MoreVertical"
                      className="w-5 h-5 text-slate-500"
                    />
                  </DropdownToggle>
                  <DropdownMenu className="w-40">
                    <DropdownContent>
                      <DropdownItem onClick={() => handleEdit(table)}>
                        <Lucide icon="Edit" className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownItem>
                      <DropdownItem onClick={() => handleDelete(table)}>
                        <Lucide icon="Trash" className="w-4 h-4 mr-2" /> Hapus
                      </DropdownItem>
                    </DropdownContent>
                  </DropdownMenu>
                </Dropdown>
              </div>
            ))}
          </div>

          <CreateModal modal={modal} setModal={setModal} />
          <UpdateModal
            modal={modalEdit}
            setModal={setmodalEdit}
            table={selectedTable}
          />
          <DeleteModal
            modal={modalDelete}
            setModal={setModalDelete}
            table={selectedTable}
          />
          <ReservasiModal
            modal={reservedModal}
            setModal={setReservedModal}
            setReservedStep={setReservedStep}
            tables={tables}
          />
        </div>
      </div>
    </>
  );
}

export default Main;

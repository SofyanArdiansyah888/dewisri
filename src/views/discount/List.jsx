import { Lucide } from "@/base-components";
import { useState } from "react";
import EmptyData from "../../components/EmptyData";
import { useDiscounts } from "../../hooks/useDiscounts";

import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import CreateModal from "./CreateModal";
function Main() {
  const [modal, setModal] = useState(false);
  const [modalEdit, setmodalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedDiscount, setselectedDiscount] = useState();
  const { data: discounts, isLoading: loading } = useDiscounts();

  const handleEdit = (discount) => {
    setselectedDiscount(discount);
    setmodalEdit(true);
  };

  const handleDelete = (discount) => {
    setselectedDiscount(discount);
    setModalDelete(true);
  };

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Diskon</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap justify-between mt-2">
          <button
            className="btn btn-primary shadow-md mr-2"
            onClick={() => setModal(true)}
          >
            Tambah Diskon
          </button>
        </div>
        {/* BEGIN: Data List */}
        <div className="intro-y col-span-12 overflow-auto ">
          {discounts?.length === 0 || !discounts ? (
            <EmptyData />
          ) : (
            <table className="table table-report -mt-2">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">Nama</th>
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
                {discounts?.map((discount, key) => (
                  <tr key={key} className="intro-x">
                    <td>
                      <div className="font-medium whitespace-nowrap">
                        {discount.name}
                      </div>
                    </td>
                    <td>
                      <div className="font-medium whitespace-nowrap">
                        {discount.amount}
                      </div>
                    </td>

                    {/* ACTION BUTTONS */}
                    <td className="table-report__action w-56">
                      <div className="flex justify-center items-center">
                        <div
                          className="flex items-center mr-3 cursor-pointer"
                          onClick={() => handleEdit(discount)}
                        >
                          <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />{" "}
                          Edit
                        </div>
                        <div
                          className="flex items-center text-danger cursor-pointer"
                          onClick={() => handleDelete(discount)}
                        >
                          <Lucide icon="Trash2" className="w-4 h-4 mr-1" />{" "}
                          Delete
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* END: Data List */}
        <CreateModal modal={modal} setModal={setModal} />

        <UpdateModal
          modal={modalEdit}
          setModal={setmodalEdit}
          discount={selectedDiscount}
        />
        <DeleteModal
          modal={modalDelete}
          setModal={setModalDelete}
          discount={selectedDiscount}
        />
      </div>
    </>
  );
}

export default Main;

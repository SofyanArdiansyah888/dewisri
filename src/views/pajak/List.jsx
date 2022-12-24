import { Lucide } from "@/base-components";
import { useState } from "react";
import EmptyData from "../../components/EmptyData";
import { useTaxes } from "../../hooks/useTaxes";
import UpdateModal from "./UpdateModal";
function Main() {
  const [modalEdit, setmodalEdit] = useState(false);
  const [selectedTaxes, setselectedTaxes] = useState();
  const {data:taxes, isLoading:loading} =  useTaxes()

  const handleEdit = (tax) => {
    setselectedTaxes(tax);
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
                {taxes?.map((tax, key) => (
                  <tr key={key} className="intro-x">
                    <td>
                      <div className="font-medium whitespace-nowrap">
                        {tax.name}
                      </div>
                    </td>
                    <td>
                      <div className="font-medium whitespace-nowrap">
                        {tax.description}
                      </div>
                    </td>
                    <td>
                      <div className="font-medium whitespace-nowrap">
                        {tax.amount}
                      </div>
                    </td>

                    {/* ACTION BUTTONS */}
                    <td className="table-report__action w-56">
                      <div className="flex justify-center items-center">
                        <div
                          className="flex items-center mr-3 cursor-pointer"
                          onClick={() => handleEdit(tax)}
                        >
                          <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />{" "}
                          Edit
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
    

        <UpdateModal
          modal={modalEdit}
          setModal={setmodalEdit}
          tax={selectedTaxes}
        />
      </div>
    </>
  );
}

export default Main;

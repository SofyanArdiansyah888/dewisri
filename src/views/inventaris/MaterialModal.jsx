import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "@/base-components";
import { useState } from "react";
import { useRawMaterial } from "../../hooks/useMaterial";

function MaterialModal({ showModal, modal, append, additionalAppend }) {
  const [selectedMaterial, setSelectedMaterial] = useState([]);
  const {data} = useRawMaterial()

  const handleChange = (data, material) => {
    if (data.target.checked) {
      setSelectedMaterial((selected) => [...selected, material]);
    } else {
      setSelectedMaterial((selected) =>
        selected.filter((item) => item.id !== material.id)
      );
    }
  };

  return (
    <>
      <Modal
        size="modal-xl"
        show={modal}
        onHidden={() => {
          showModal(false);
        }}
      >
        {/* <form className="validate-form" onSubmit={handleSubmit(handleCreate)}> */}
        <ModalHeader>
          <h2 className="text-lg font-medium mr-auto">Pilih Material</h2>
        </ModalHeader>
        <ModalBody>
          <table className="table table-report -mt-2 w-full">
            <thead>
              <tr>
                <th>Pilih</th>
                <th className="whitespace-nowrap">Bahan</th>
                <th className="whitespace-nowrap">Tipe</th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((material, index) => (
                <tr key={index} className="intro-x">
                  <td>
                    <input
                      type="checkbox"
                      value={material.id}
                      onChange={(data) => handleChange(data, material)}
                    ></input>
                  </td>
                  <td>
                    <a  className="font-medium whitespace-nowrap">
                      {material.name}
                    </a>
                  </td>
                  <td>{material.type === "RAW" ? "BAKU" : "PENDUKUNG"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            onClick={() => {
              showModal(false);
              setSelectedMaterial([]);
              document
                .querySelectorAll("input[type=checkbox]")
                .forEach((el) => (el.checked = false));
            }}
            className="btn btn-outline-secondary w-20 mr-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary w-20"
            onClick={() => {
              showModal(false);
              
              selectedMaterial.map((item) => {
                let temp = {
                  material_id: item.id,
                  name: item.name,
                  type: item.type,
                  ...additionalAppend
                }
                if(temp.system_stock === 0){
                  temp.system_stock = item.stock
                }
                append(temp);
              });
              document
              .querySelectorAll("input[type=checkbox]")
              .forEach((el) => (el.checked = false));
              setSelectedMaterial([]);
            }}
          >
            Submit
          </button>
        </ModalFooter>
        {/* </form> */}
      </Modal>
    </>
  );
}

export default MaterialModal;

import { Lucide, Modal, ModalBody } from "@/base-components";
import { useQueryClient } from "react-query";
import { useCancelReservation } from "../../../hooks/useReservation";

function CancelModal({ modal, setModal, reservation }) {
  
  const queryClient = useQueryClient();
  const reservationId = reservation && reservation.id;
  const { mutate } = useCancelReservation(reservationId, () => {
    queryClient.invalidateQueries({ queryKey: ["reservations"] });
    setModal(false);
  });

  const handleCancel = () => {
    let tableIds = reservation.table.map(table => table.id)
    
    mutate({
      status: 'CANCEL',
      table_id: tableIds
    })
  }

  return (
    <>
      <Modal
       show={modal}
        onHidden={() => {
          setModal(false);
        }}
      >
        <ModalBody className="p-0">
          <div className="p-5 text-center">
            <Lucide
              icon="XCircle"
              className="w-16 h-16 text-danger mx-auto mt-3"
            />
            <div className="text-3xl mt-5">Are you sure?</div>
            <div className="text-slate-500 mt-2">
              Do you really want to cancel this reservation? <br />
              <strong className="capitalize">{reservation ? reservation.name : ''}</strong>
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <button
              type="button"
              onClick={() => {
                setModal(false);
              }}
              className="btn btn-outline-secondary w-24 mr-1"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger w-48"
              onClick={handleCancel}
            >
              Cancel Reservasi
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default CancelModal;

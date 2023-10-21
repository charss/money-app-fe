import { Fragment, useState } from "react";
import Modal from "./Modal";
import EditModal from "./EditModal";

function ModalMain({toggle, modalType, editData}) {
  // let [isOpen, setIsOpen] = useState(toggle);

  if (modalType === 'EDIT') {
    return (
      <EditModal toggle={toggle} editData={editData}/>
    )
  } else {

    return (
      <>
        <div className="flex fixed inset-0 z-10 w-screen h-screen overflow-y-hidden">
          <div className="relative m-auto w-96 h-96 border-solid border-2 border-sky-500">
            <button onClick={() => toggle()}>CLOSE</button>
            TEST MODAL
            <div className=""></div>
          </div>
        </div>
      </>
    );
  }
}

export default ModalMain;

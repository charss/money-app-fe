import { Fragment, useState } from "react";
import Modal from "./Modal";
import EditModal from "./EditModal";
import DateModal from "./DateModal";
import AddTransactionModal from "./AddTransactionModal";

function ModalMain({ toggle, modalType, editData, root }) {
  if (modalType === "EDIT") {
    return <EditModal toggle={toggle} editData={editData} />;
  }

  if (modalType === "DATE") {
    return <DateModal toggle={toggle} editData={editData} />;
  }

  if (modalType === "ADD TRANSACTION") {
    return (
      <AddTransactionModal toggle={toggle} modalData={editData} root={root} />
    );
  }

  return <Modal toggle={toggle} />;
}

export default ModalMain;

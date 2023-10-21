import { Fragment, useState } from "react";

function Modal({toggle}) {

  return (
    <>
      <div className="flex fixed inset-0 z-10 w-screen h-screen overflow-y-hidden">
        <div className="relative m-auto w-96 h-96  bg-lime-200">
          <button onClick={() => toggle("CLOSE")}>CLOSE</button>
          TEST MODAL
          <div className=""></div>
        </div>
      </div>
      {/* <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel>
          <Dialog.Title>Deactivate account</Dialog.Title>
          <Dialog.Description>
            This will permanently deactivate your account
          </Dialog.Description>

          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p>

          <button onClick={() => setIsOpen(false)}>Deactivate</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog.Panel>
      </Dialog> */}
    </>
  );
}

export default Modal;

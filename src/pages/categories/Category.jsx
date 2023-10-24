import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Api from "../../helper/api";
import Modal from "../../components/modal/ModalTest";
import ModalMain from "../../components/modal/ModalMain";

function Category({ toggleModal }) {
  const [isLoading, setIsLoading] = useState(true);
  const [modalData, setModalData] = useState(null);
  const [loadedData, setLoadedData] = useState([]);
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();

  const api = new Api();

  const toggleShow = () => setShow((current) => !current);

  const fetchCategories = () => {
    api
      .getCategories()
      .then((response) => {
        return response["data"];
      })
      .then((data) => {
        const categories = [];
        for (const key in data) {
          const account = {
            id: key,
            ...data[key],
          };

          categories.push(account);
        }
        setIsLoading(false);
        setLoadedData(categories);
      })
      .catch((err) => console.log(err));
  };

  function toggleModal(modal, modalData) {
    setIsModalOpen(!isModalOpen)
    setModalType(modal)
    setModalData(modalData);
  }

  // console.log(loadedData);

  useEffect(() => {
    setIsLoading(true);
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div>
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div className="home">
      <h1>Categories</h1>
      {isModalOpen && modalData !== null ? (
        <ModalMain
          toggle={toggleModal}
          modalType={modalType}
          editData={modalData}
        />
      ) : null}
      {/* <form onSubmit={handleAddTransaction}>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="account-name"
          >
            Account Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="account-name"
            type="text"
            placeholder="Account Name"
            name="account-name"
          ></input>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Send
        </button>
      </form> */}
      <div className="flex flex-col gap-2">
        {loadedData.map((data) => (
          <div key={data.id}>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => toggleModal("ADD TRANSACTION", data)}
            >
              <div className="">{data.name}</div>
            </button>
            <div className="">{data.total}</div>
          </div>
        ))}
      </div>

      <button onClick={toggleShow}>Open Modal</button>
      <Modal show={show} toggleShow={toggleShow} />
    </div>
  );
}

export default Category;

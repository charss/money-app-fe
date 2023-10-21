import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Api from "../../helper/api";
import AccountCard from "../../components/accountCard/AccountCard";
import ModalMain from "../../components/modal/ModalMain";

function Account() {
  const [isLoading, setIsLoading] = useState(true);
  const [editData, setEditData] = useState([]); 
  const [modalType, setModalType] = useState("");
  const [loadedData, setLoadedData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrollBarVisible, setIsScrollBarVisible] = useState(false);
  const navigate = useNavigate();

  const api = new Api();

  const fetchAccounts = () => {
    api
      .getAccountsWithTotal()
      .then((response) => {
        return response["data"];
      })
      .then((data) => {
        const accounts = [];
        for (const key in data) {
          const account = {
            id: key,
            ...data[key],
          };

          accounts.push(account);
        }
        setIsLoading(false);
        setLoadedData(accounts);
      })
      .catch((err) => console.log(err));
  };

  const handleAddAccount = async (e) => {
    e.preventDefault();
    console.log("Handle Add Acount");

    try {
      // Read the form data
      const form = e.target;
      // console.log(form);
      const request = {
        name: e.target["account-name"].value,
        user_id: 1,
      };
      // const formData = new FormData(form);

      api
        .addNewAccount(request)
        .then((response) => {
          return response["data"];
        })
        .then((data) => {
          // console.log(data);
        });
      // navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  function toggleModal(modal, data) {
    console.log("TOGGLE MODAL")
    if (modal !== 'EXIT') {
      // setEditData(data)
      console.log("DATA SET")
      console.log(editData)
    }
    setIsModalOpen(!isModalOpen)
    setModalType(modal);
    setEditData(data)
  }

  console.log(loadedData);

  useEffect(() => {
    setIsLoading(true);
    fetchAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'overlay';
    };
  }, [isModalOpen]);

  if (isLoading) {
    return (
      <div>
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  console.log("EDIT DATA", editData)
  return (
    <div className="flex flex-col gap-3 h-full">
      <button
        type="button"
        onClick={toggleModal}
        className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Open dialog
      </button>
      {isModalOpen && editData.length !== 0 ? (
        <ModalMain toggle={toggleModal} modalType={modalType} editData={editData} />
      ) : null}
      <h1>Accounts</h1>
      <form onSubmit={handleAddAccount}>
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
      </form>
      <div>
        {loadedData.map((data) => (
          <AccountCard
            key={data.id}
            id={data.id}
            name={data.name}
            total={data.total}
            toggleModal={toggleModal}
          />
        ))}
      </div>
    </div>
  );
}

export default Account;

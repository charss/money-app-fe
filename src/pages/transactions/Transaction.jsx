import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Api from "../../helper/api";
import TransactionCard from "../../components/transactionCard/TransactionCard";
import ModalMain from "../../components/modal/ModalMain";

function Transaction() {
  const [isLoading, setIsLoading] = useState(true);
  const [editData, setEditData] = useState([]);
  const [loadedData, setLoadedData] = useState([]);
  const [modalType, setModalType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const api = new Api();

  const fetchTransactions = () => {
    api
      .getTransactions()
      .then((response) => {
        return response["data"];
      })
      .then((data) => {
        const transactions = [];
        for (const key in data) {
          const account = {
            id: key,
            ...data[key],
          };

          transactions.push(account);
        }
        setIsLoading(false);
        setLoadedData(transactions);
      })
      .catch((err) => console.log(err));
  };

  function toggleModal(modal, data) {
    setIsModalOpen(!isModalOpen);
    setModalType(modal);
    setEditData(data);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchTransactions();
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
    <div className="flex flex-col gap-3 h-full">
      <h1 className="mb-2">Transactions</h1>
      {isModalOpen && editData.length !== 0 ? (
        <ModalMain
          toggle={toggleModal}
          modalType={modalType}
          editData={editData}
        />
      ) : null}
      <div className="flex flex-col gap-2">
        {loadedData.map((data) => (
          <TransactionCard
            key={data.id}
            id={data.id}
            accountName={data.accountName}
            amount={data.amount}
            transactionDate={data.transactionDate}
            type={data.type}
            toggleModal={toggleModal}
          />
        ))}
      </div>
    </div>
  );
}

export default Transaction;

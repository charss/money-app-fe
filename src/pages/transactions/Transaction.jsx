import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Api from "../../helper/api";

function Transaction() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedData, setLoadedData] = useState([]);
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

  // const handleAddAccount = async (e) => {
  //   e.preventDefault();
  //   console.log("Handle Add Acount");

  //   try {
  //     // Read the form data
  //     const form = e.target;
  //     console.log(form);
  //     const request = {
  //       name: e.target["account-name"].value,
  //       user_id: 1,
  //     };
  //     // const formData = new FormData(form);

  //     api
  //       .addNewAccount(request)
  //       .then((response) => {
  //         return response["data"];
  //       })
  //       .then((data) => {
  //         console.log(data);
  //       });
  //     // navigate(-1);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  console.log(loadedData);

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
    <div className="home">
      <h1 className="mb-2">Transactions</h1>
      {/* <form onSubmit={handleAddAccount}>
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
            <div className="">{data.accountName}</div>
            <div className="">{data.categoryName}</div>
            <div className="">{data.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transaction;

import { useState, useEffect } from "react";
import Api from "../../helper/api";

export default function AddTransactionModal({ toggle, modalData }) {
  const api = new Api();
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [accountId, setAccountId] = useState(null);

  const fetchAccounts = () => {
    api
      .getAccounts()
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
        setAccountId(accounts[0].id);
        setIsLoading(false);
        setAccounts(accounts);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setIsLoading(true);
    fetchAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectAccount = (e) => {
    setAccountId(e.target.value)
  }

  const handleAddTransaction = async (e) => {
    e.preventDefault();

    try {
      // Read the form data
      const form = e.target;
      const payload = {
        accountId: accountId,
        amount: form['amount'].value,
        categoryId: modalData.id,
        type: 'Expense', // TODO: Should be able to choose type
      };

      console.log(payload)
      api
        .addNewTransaction(payload)
        .then((response) => {
          return response["data"];
        })
        .then((data) => {
          console.log(data);
        });
        // navigate(-1);
        window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  }

  if (isLoading) {
    return (
      <div>
        <span className="visually-hidden">Loading Modal...</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex fixed inset-0 z-10 w-screen h-screen overflow-y-hidden">
        <div className="flex flex-col relative m-auto w-96 h-96 bg-lime-200 p-5 gap-2">
          <button onClick={() => toggle("CLOSE")}>CLOSE</button>
          <br />
          ADD TRANSACTION MODAL
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Account Name
          </label>
          <select onChange={handleSelectAccount}>
            {accounts.map((data) => (
              <option key={data.id} value={data.id}>
                {data.name}
              </option>
            ))}
          </select>
          <form onSubmit={handleAddTransaction}>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="account-name"
              >
                Amount
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                // placeholder="Account Name"
                name="amount"
                // defaultValue={editData['name']}
              ></input>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Send
            </button>
          </form>
          <div className=""></div>
        </div>
      </div>
    </>
  );
}

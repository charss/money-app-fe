import { useState } from "react";
import Api from "../../helper/api";
import { format, isToday, startOfYesterday } from "date-fns";

export default function DateModal({ toggle, editData }) {
  const api = new Api();
  const [formattedDate, setformattedDate] = useState(
    format(new Date(editData["transactionDate"]), "yyyy-MM-dd")
  );

  const handleDateChange = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        transactionDate: formattedDate,
      };

      api
        .updateTransactionDate(editData["id"], payload)
        .then((response) => {
          return response["data"];
        })
        .then((data) => {
          console.log(data);
        });
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeDate = (date) => {
    if (date.toUpperCase() === "YESTERDAY")
      setformattedDate(format(startOfYesterday(), "yyyy-MM-dd"));
    else if (date.toUpperCase() === "TODAY")
      setformattedDate(format(new Date(), "yyyy-MM-dd"));
  };

  const handleDateChangeCustom = (e) => {
    setformattedDate(format(new Date(e.target.value), "yyyy-MM-dd"));
  };

  return (
    <>
      <div className="flex fixed inset-0 z-10 w-screen h-screen overflow-y-hidden">
        <div className="flex flex-col relative m-auto w-96 h-96 bg-lime-200 p-5 gap-3">
          <button onClick={() => toggle("CLOSE")}>CLOSE</button>
          <br />
          Edit Date Modal
          <form className="flex flex-col gap-3" onSubmit={handleDateChange}>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Transaction Date
              </label>
              <input
                className="w-full"
                type="date"
                name="transaction_date"
                value={formattedDate}
                onChange={handleDateChangeCustom}
              />
            </div>
            <div className="flex gap-3">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-6/12"
                type="button"
                onClick={() => handleChangeDate("yesterday")}
              >
                Yesterday
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-6/12"
                type="button"
                onClick={() => handleChangeDate("today")}
              >
                Today
              </button>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AccountCard({ id, name, total, toggleModal }) {
  let font_color = "text-slate-200";

  if (total < 0) font_color = "text-red-400";
  else if (total > 0) font_color = "text-green-400";

  return (
    <div className="flex flex-col mb-2 align-middle justify-center w-96 border-4 p-5 rounded-xl">
      <div className="flex justify-between">
        {/* <FontAwesomeIcon icon={faCreditCard} size="2xl"/> */}
        <FontAwesomeIcon icon={faCreditCard} size="2xl" style={{color: "#7b889d",}} />
        <span className={"font-bold text-xl " + font_color}>{total}</span>
      </div>
      <span className="text-slate-300 ">{name}</span>
      <div className="flex gap-1">
        <button className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
          See Transactions
        </button>
        <button className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
          Add Transaction
        </button>
        <button
          className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          onClick={() => toggleModal("EDIT", { id, name, total })}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default AccountCard;

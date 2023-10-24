import { format, isToday } from "date-fns";

export default function TransactionCard({
  id,
  accountName,
  amount,
  transactionDate,
  type,
  toggleModal,
}) {
  const formatted_date = format(new Date(transactionDate), "MMM dd, yyyy");

  return (
    <div className="flex flex-col mb-2 align-middle justify-center w-96 border">
      <span className="text-sky-50">{accountName}</span>
      <span className={type == 'Expense' ? 'text-red-400' : 'text-green-400'}>{amount}</span>
      <span className="text-green-400">{formatted_date}</span>
      <div className="flex gap-1">
        <button
          className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          // onClick={() => toggleModal("EDIT", {id, name, total})}
        >
          Edit
        </button>
        <button
          className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          onClick={() => toggleModal("DATE", { id, transactionDate })}
        >
          Update Date
        </button>
      </div>
    </div>
  );
}

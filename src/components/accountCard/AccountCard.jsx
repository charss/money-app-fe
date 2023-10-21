function AccountCard({ id, name, total, toggleModal }) {

  return (
    <div className="flex flex-col mb-2 align-middle justify-center w-96 border">
      <div className="flex justify-between">
        <span className="text-slate-300 ">{name}</span>
        <span className={"font-bold " + (total < 0 ? 'text-red-500' : 'text-slate-200')}>{total}</span>
      </div>
      <div className="flex gap-1">
        <button className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
          See Transactions
        </button>
        <button className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
          Add Transaction
        </button>
        <button 
          className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          onClick={() => toggleModal("EDIT", {id, name, total})}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default AccountCard;

import { Fragment, useState } from "react";
import Api from "../../helper/api";
import { useNavigate } from "react-router-dom";

function EditModal({toggle, editData}) {
  // const name = editData['name']
  const api = new Api();
  const navigate = useNavigate();
  const [editName, setEditName] = useState(editData['name']); 
  console.log("EDIT MODAL", editData)

  const handleEditAccount = async (e) => {
    e.preventDefault();

    try {
      // Read the form data
      const form = e.target;
      // console.log(form);
      const payload = {
        name: form["account-name"].value,
      };
      // const formData = new FormData(form);

      api
        .updateAccount(editData['id'], payload)
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

  return (
    <>
      <div className="flex fixed inset-0 z-10 w-screen h-screen overflow-y-hidden">
      <div className="flex flex-col relative m-auto w-96 h-96 bg-lime-200 p-5 gap-2">
          <button onClick={() => toggle("CLOSE")}>CLOSE</button>
            <br />
            Edit Modal
            <label>Account Name</label>
            <form onSubmit={handleEditAccount}>
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
                  defaultValue={editData['name']}
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

export default EditModal;

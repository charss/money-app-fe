import { useState, useEffect } from "react";
import Api from "../../helper/api";
import { useNavigate } from "react-router-dom";

export default function Modal({ toggle, editData }) {
  const api = new Api();
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState(null);
  const navigate = useNavigate();
  console.log("EDIT MODAL", editData);

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
        setCategories(categories);
      })
      .catch((err) => console.log(err));
  };

  const handleEditAccount = async (e) => {
    e.preventDefault();

    try {
      // Read the form data
      const form = e.target;
      const payload = {
        name: form["account-name"].value,
      };

      api
        .updateAccount(editData["id"], payload)
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
  };

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
    <>
      <div className="flex fixed inset-0 z-10 w-screen h-screen overflow-y-hidden">
        <div className="flex flex-col relative m-auto w-96 h-96 bg-lime-200 p-5 gap-2">
          <button
            className="bg-zinc-800 hover:bg-zinc-900 text-slate-200 font-bold py-2 px-4 rounded"
            onClick={() => toggle("CLOSE")}
          >
            CLOSE
          </button>
          <br />
          DEFAULT MODAL
          {categories.map((category) => (
            <div key={category.id}>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => toggle("ADD TRANSACTION", category)}
              >
                {category.name}
              </button>
            </div>
          ))}
          <div className=""></div>
        </div>
      </div>
    </>
  );
}

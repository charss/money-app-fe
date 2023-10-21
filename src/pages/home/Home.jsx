import { useState, useEffect } from "react";

import Api from "../../helper/api";

function Home({ title }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedData, setLoadedData] = useState([]);

  const api = new Api();

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
        setIsLoading(false);
        setLoadedData(accounts);
      })
      .catch((err) => console.log(err));
  };

  console.log(loadedData)

  useEffect(() => {
    setIsLoading(true);
    if (title === "Accounts") {
      fetchAccounts();
    } else if (title === "Rubrics") {
      // fetchRubrics();
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  if (isLoading) {
    return (
      <div>
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div className="home">
      <h1>
        {title}
      </h1>
      {loadedData.map((data) => (
        <span>{data.name}</span>

      ))}

    </div>
  );
}

export default Home;

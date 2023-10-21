import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Account from "./pages/accounts/Account";
import Category from "./pages/categories/Category";
import Transaction from "./pages/transactions/Transaction";

function App() {
  return (
    <div className="w-full h-full pt-12">
      <Routes>
        <Route path="/">
          <Route path="accounts">
            <Route index element={<Account />}/>
          </Route>
          <Route path="categories">
            <Route index element={<Category />}/>
          </Route>
          <Route path="transactions">
            <Route index element={<Transaction />}/>
          </Route>
          {/* <Route index element={<Home title="Dashboard" />} />
          <Route path="groups">
            <Route index element={<List title="Groups" />} />
          </Route>
          <Route path="panelists">
            <Route index element={<List title="Panelists" />} />
          </Route>
          <Route path="students">
            <Route index element={<List title="Students" />} />
          </Route>
          <Route path="schedules">
            <Route index element={<CardsPage title="Schedules" />} />
          </Route>
          <Route path="gradesheets">
            <Route index element={<List title="Gradesheets" />} />
          </Route>
          <Route path="rubrics">
            <Route index element={<CardsPage title="Rubrics" />} />
          </Route> */}
        </Route>
      </Routes>
    </div>

  );
}

export default App;

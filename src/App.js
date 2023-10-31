import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home"
import Account from "./pages/accounts/Account";
import Category from "./pages/categories/Category";
import Transaction from "./pages/transactions/Transaction";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import Keycloak from "keycloak-js";
import PrivateRoute from "./helper/PrivateRoute";
import Navbar from "./components/navbar/Navbar";

function App() {
  const keycloak = new Keycloak({
    url: "http://localhost:8081/",
    realm: "money-app",
    clientId: "money-app-web",
  });

  const initOptions = { pkceMethod: 'S256' }

  return (
    <div className="w-full h-full">
      <ReactKeycloakProvider authClient={keycloak} initOptions={initOptions}>
        <Navbar />
        <div className="pt-12">
          <PrivateRoute>
            <Routes>
              <Route path="/">
                <Route
                  index
                  element={
                      <Home />
                  }
                />
                <Route path="accounts">
                  <Route
                    index
                    element={
                        <Account />
                    }
                  />
                </Route>
                <Route path="categories">
                  <Route index element={<Category />} />
                </Route>
                <Route path="transactions">
                  <Route index element={<Transaction />} />
                </Route>
              </Route>
            </Routes>
          </PrivateRoute>
        </div>
      </ReactKeycloakProvider>
    </div>
  );
}

export default App;

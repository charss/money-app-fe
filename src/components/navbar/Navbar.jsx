import { useKeycloak } from "@react-keycloak/web";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  const handleLogInOut = () => {
    if (keycloak.authenticated) {
      navigate('/')
      keycloak.logout();
    } else {
      keycloak.login();
    }
  }

  const getLogInOutText = () => {
    return keycloak.authenticated ? "Logout" : "Login"
  }


  return (
    <div className="flex flex-row gap-x-8 fixed h-10 bg-sky-900 w-full items-center">
      <NavLink to="/" end>
        <span>Home</span>
      </NavLink>
      <NavLink to="/accounts/">
        <span>Accounts</span>
      </NavLink>
      <NavLink to="/categories/" end>
        <span>Categories</span>
      </NavLink>
      <NavLink to="/transactions/" end>
        <span>Transactions</span>
      </NavLink>
      {/* <button onClick={handleLogInOut}>HERE {getLogInOutText}</button> */}
    </div>
  );
}

export default Navbar;
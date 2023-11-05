import { useKeycloak } from "@react-keycloak/web";
import { Link, NavLink, useNavigate } from "react-router-dom";
import NavItem from "./NavItem";

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
    <div className="flex flex-col gap-3 bg-stone-800 pt-7 px-3 h-screen">
      {/* <NavLink 
        to="/" 
        className={({ isActive, isPending, isTransitioning }) =>
          [
            isPending ? "pending" : "",
            isActive ? "bg-yellow-400" : "",
            isTransitioning ? "transitioning" : "",
          ].join(" ")
        }
        end
      >
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
      </NavLink> */}
      <NavItem text="Home" link="/" />
      <NavItem text="Accounts" link="/accounts/" />
      <NavItem text="Categories" link="/categories/" />
      <NavItem text="Transactions" link="/transactions/" />
      {/* <button onClick={handleLogInOut}>HERE {getLogInOutText}</button> */}
    </div>
  );
}

export default Navbar;
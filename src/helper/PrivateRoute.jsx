import { useKeycloak } from "@react-keycloak/web";

function PrivateRoute({ children }) {
  const { keycloak } = useKeycloak();
  const Login = () => {
    try {
      keycloak.login()

    } catch (e) {
      console.log("PRIVATE ROUTE", e)
    }
  }

  return keycloak.authenticated ? children : <Login />
}

export default PrivateRoute;
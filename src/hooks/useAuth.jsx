import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useAuth() {
  const authContext = useContext(AuthContext);

  const auth = authContext.user;
  const setAuth = (user) => {
    if (user) {
      authContext.login(user);

      window.localStorage.setItem("token-data", JSON.stringify(user));
    } else {
      authContext.logout();

      window.localStorage.setItem("token-data");
    }
  };
  return [auth, setAuth];
}

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ReducerContext } from "../../context/ReducerContext";
import { Profile } from "../../pages/Profile/Profile";

export function AuthenticatedRoute(props) {
  const context = useContext(ReducerContext);

  return context.state.isAuthenticated ? (
    <Profile />
  ) : (
    <Navigate to="/zaloguj" />
  );
}

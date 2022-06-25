import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ReducerContext } from "../../context/ReducerContext";

export function AuthenticatedRoute(props) {
  const context = useContext(ReducerContext);

  return context.state.user ? <Outlet /> : <Navigate to="/zaloguj" />;
}

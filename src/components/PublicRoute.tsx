
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

export default function PublicRoute() {
  const user = useSelector((state: RootState) => state.auth.user);

  return user ? <Navigate to="/" replace /> : <Outlet />;
}

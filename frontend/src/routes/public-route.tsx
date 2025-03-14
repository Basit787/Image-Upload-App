import { useAuth } from "@/context/login/useAuth";
import { Navigate, Outlet } from "react-router";

const AuthGuard = () => {
  const { isToken } = useAuth();

  return isToken ? <Navigate to="/" replace /> : <Outlet />;
};

export default AuthGuard;

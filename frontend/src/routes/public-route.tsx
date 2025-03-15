import { useAuth } from "@/context/auth/use-auth";
import { Navigate, Outlet } from "react-router";

const AuthGuard = () => {
  const { isToken } = useAuth();

  return isToken ? <Navigate to="/" replace /> : <Outlet />;
};

export default AuthGuard;

import { Navigate, Outlet, useLocation } from "react-router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";

const AuthGuard = () => {
  const [auth, setAuth] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      setAuth(!!Cookies.get("token"));
    };

    checkAuth();

    const interval = setInterval(checkAuth, 1000);

    return () => clearInterval(interval);
  }, []);

  if (auth === null) return <Loading />;

  return auth ? (
    <Navigate to="/" replace state={{ from: location }} />
  ) : (
    <Outlet />
  );
};

export default AuthGuard;

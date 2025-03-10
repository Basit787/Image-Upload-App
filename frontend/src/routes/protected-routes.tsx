import { Navigate, Outlet, useLocation } from "react-router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import Header from "@/components/header";

const ProtectedRoutes = () => {
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

  return (
    <div>
      <Header />
      <div className="mt-24">
        {auth ? (
          <Outlet />
        ) : (
          <Navigate to="/auth" replace state={{ from: location }} />
        )}
      </div>
    </div>
  );
};

export default ProtectedRoutes;

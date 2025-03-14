import Header from "@/components/header";
import { useAuth } from "@/context/login/useAuth";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
  const { isToken } = useAuth();

  return (
    <div>
      <Header />
      <div className="mt-32">
        {isToken ? <Outlet /> : <Navigate to="/auth" replace />}
      </div>
    </div>
  );
};

export default ProtectedRoutes;

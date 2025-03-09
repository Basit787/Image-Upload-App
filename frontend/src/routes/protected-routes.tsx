import Header from "@/components/header";
import { Outlet } from "react-router";

const ProtectedRoutes = () => {
  return (
    <div>
      <Header />
      <div className="mt-24">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedRoutes;

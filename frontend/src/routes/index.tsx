import ErrorPage from "@/error-element";
import NotFound from "@/not-found";
import AuthRoutes from "@/pages/auth/AuthRoutes";
import { ImageGallery } from "@/pages/image/Image";
import ProfileDetails from "@/pages/profileDetails/ProfileDetails";
import { createBrowserRouter, RouterProvider } from "react-router";
import ProtectedRoutes from "./protected-routes";
import PublicRoutes from "./public-route";

const routes = createBrowserRouter([
  {
    path: "/auth",
    element: <PublicRoutes />,
    children: [{ index: true, element: <AuthRoutes /> }],
  },
  {
    path: "/",
    element: <ProtectedRoutes />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <ImageGallery /> },
      { path: "profile", element: <ProfileDetails /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export const AppRoutes = () => {
  return <RouterProvider router={routes} />;
};

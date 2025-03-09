import Error from "@/components/error";
import AuthRoutes from "@/pages/AuthRoutes";
import { ImageGallery } from "@/pages/image/image-gallery";
import Image from "@/pages/ImageGallery";
import { createBrowserRouter, RouterProvider } from "react-router";
import ProtectedRoutes from "./protected-routes";
import ProfileDetails from "@/pages/profileDetails/ProfileDetails";

const routes = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthRoutes />,
  },
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      { index: true, element: <Image /> },
      { path: "gallery", element: <ImageGallery /> },
      { path: "profile", element: <ProfileDetails /> },
    ],
  },
  { path: "*", element: <Error /> },
]);

export const AppRoutes = () => {
  return <RouterProvider router={routes} />;
};

import { JSX, lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router"; // (Fixed: Correct import)
import ProtectedRoutes from "./protected-routes";
import PublicRoutes from "./public-route";
import Loading from "@/components/loading";

const ErrorPage = lazy(() => import("@/error-element"));
const NotFound = lazy(() => import("@/not-found"));
const AuthRoutes = lazy(() => import("@/pages/auth/AuthRoutes"));
const ImageGallery = lazy(() => import("@/pages/image/Image"));
const ProfileDetails = lazy(
  () => import("@/pages/profileDetails/ProfileDetails")
);

const SuspenseWrapper = (
  Component: React.LazyExoticComponent<() => JSX.Element>
) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

const routes = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoutes />,
    children: [{ index: true, element: SuspenseWrapper(AuthRoutes) }],
  },
  {
    path: "/images",
    element: <ProtectedRoutes />,
    errorElement: SuspenseWrapper(ErrorPage),
    children: [
      { index: true, element: SuspenseWrapper(ImageGallery) },
      { path: "profile", element: SuspenseWrapper(ProfileDetails) },
    ],
  },
  { path: "*", element: SuspenseWrapper(NotFound) },
]);

export const AppRoutes = () => {
  return <RouterProvider router={routes} />;
};

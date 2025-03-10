// src/components/ErrorPage.tsx
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";
import { Button } from "./components/ui/button";

const ErrorPage = () => {
  const error = useRouteError();
  console.error("Error caught by router:", error);

  let errorMessage = "Something went wrong.";
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || "Page Not Found";
  }

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-destructive">Oops!</h1>
      <p className="text-lg">{errorMessage}</p>
      <Button
        className="mt-4 bg-primary/50 text-background"
        onClick={() => navigate(-1)}
      >
        Go back
      </Button>
    </div>
  );
};

export default ErrorPage;

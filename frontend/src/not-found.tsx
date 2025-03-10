import { useNavigate } from "react-router";
import { Button } from "./components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-7xl font-bold text-destructive">404</h1>
      <h2 className="text-2xl font-semibold text-foreground/75 mt-4">
        Page Not Found
      </h2>
      <p className="mt-2">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button
        className="mt-6 px-6 py-3 text-background rounded-lg transition bg-primary/50 hover:bg-primary/25"
        onClick={() => navigate(-1)}
      >
        Go Back
      </Button>
    </div>
  );
};

export default NotFound;

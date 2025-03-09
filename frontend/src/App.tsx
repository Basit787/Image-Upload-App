import { Toaster } from "./components/ui/sonner";
import { AppRoutes } from "./routes";

const App = () => {
  return (
    <div className="container mx-auto">
      <AppRoutes />
      <Toaster />
    </div>
  );
};

export default App;

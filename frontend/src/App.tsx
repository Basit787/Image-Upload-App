import { Card, CardContent } from "./components/ui/card";
import { useSignModeContext } from "./context/SignMode.Context";
import { SignIn } from "./pages/auth/SignIn";
import { SignUp } from "./pages/auth/SignUp";

const App = () => {
  const { value } = useSignModeContext();

  const AuthRoutes = () => {
    switch (value) {
      case 0:
        return <SignIn />;
      case 1:
        return <SignUp />;
      default:
        throw new Error("Unknown route found");
    }
  };
  return (
    <section className="flex justify-center items-center min-h-screen">
      <Card className="md:w-1/3 w-full m-4">
        <CardContent>
          <AuthRoutes />
        </CardContent>
      </Card>
    </section>
  );
};

export default App;

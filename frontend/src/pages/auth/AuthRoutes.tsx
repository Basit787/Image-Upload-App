import { Card, CardContent } from "@/components/ui/card";
import { useAuthStep } from "@/context/authStep/useAuthStep";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

const AuthRoutes = () => {
  const { authStep } = useAuthStep();

  const AuthRoute = () => {
    switch (authStep) {
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
          <AuthRoute />
        </CardContent>
      </Card>
    </section>
  );
};

export default AuthRoutes;

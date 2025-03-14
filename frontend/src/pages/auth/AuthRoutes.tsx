import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuthStep } from "@/context/authStep/useAuthStep";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

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
      <Card className="xl:w-1/3 md:1/2 w-full m-4">
        <CardHeader className="text-center p-2 pb-6 pt-0 font-bold text-2xl border-b-2">
          Image Gallery
        </CardHeader>
        <CardContent>
          <AuthRoute />
        </CardContent>
      </Card>
    </section>
  );
};

export default AuthRoutes;

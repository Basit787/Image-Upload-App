import { createContext, ReactNode, useContext, useState } from "react";

type AuthStepContextType = {
  authStep: number;
  setAuthStep: (step: number) => void;
};

const AuthStepContext = createContext<AuthStepContextType | undefined>(
  undefined
);

const AuthStepProvider = ({ children }: { children: ReactNode }) => {
  const [authStep, setAuthStep] = useState<number>(0);

  return (
    <AuthStepContext.Provider value={{ authStep, setAuthStep }}>
      {children}
    </AuthStepContext.Provider>
  );
};

export default AuthStepProvider;

export const useAuthStep = () => {
  const context = useContext(AuthStepContext);
  if (!context) {
    throw new Error("useAuthStep must be used within an AuthStepProvider");
  }
  return context;
};

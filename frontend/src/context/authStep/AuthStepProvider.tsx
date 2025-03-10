import { createContext, ReactNode, useState } from "react";

type AuthStepContextType = {
  authStep: number;
  setAuthStep: (step: number) => void;
};

export const AuthStepContext = createContext<AuthStepContextType | undefined>(
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

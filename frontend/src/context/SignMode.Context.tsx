import React, { createContext, useContext, useState } from "react";

type SignContextType = {
  value: number;
  change: (data: number) => void;
};

const SignContext = createContext<SignContextType | undefined>(undefined);

const SignModeContext = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = useState<number>(0);
  const change = (data: number) => {
    setValue(data);
  };
  return (
    <SignContext.Provider value={{ value, change }}>
      {children}
    </SignContext.Provider>
  );
};

export default SignModeContext;

export const useSignModeContext = () => {
  const context = useContext(SignContext);
  if (!context)
    throw new Error("useSignModeContext must use within SignModeContext");
  return context;
};

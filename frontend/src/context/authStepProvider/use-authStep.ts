import { useContext } from "react";
import { AuthStepContext } from "./authStep-provider";

export const useAuthStep = () => {
  const context = useContext(AuthStepContext);
  if (!context) {
    throw new Error("useAuthStep must be used within an AuthStepProvider");
  }
  return context;
};

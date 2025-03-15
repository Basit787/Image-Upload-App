import { useContext } from "react";
import { ViewImageContext } from "./imageView-provider";

export const useViewImageContext = () => {
  const context = useContext(ViewImageContext);
  if (!context) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }
  return context;
};

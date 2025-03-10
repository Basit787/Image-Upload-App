import { useContext } from "react";
import { DeleteImageContext } from "./DeleteImageProvider";

export const useDeleteImageProvider = () => {
  const context = useContext(DeleteImageContext);
  if (!context) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }
  return context;
};

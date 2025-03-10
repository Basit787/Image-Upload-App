"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface DialogContextModalDetail {
  open: boolean;
  id: string;
}

interface DialogContextType {
  openDialog: (id: string) => void;
  closeDialog: () => void;
  modal: DialogContextModalDetail;
}

const DeleteImageContext = createContext<DialogContextType | undefined>(
  undefined
);

export const DeleteImageProvider = ({ children }: { children: ReactNode }) => {
  const [deleteDialog, setDeleteDialog] = useState<DialogContextModalDetail>({
    open: false,
    id: "",
  });

  const openDialog = (id: string) => {
    setDeleteDialog({ ...deleteDialog, id: id, open: true });
  };
  const closeDialog = () => {
    setDeleteDialog({ ...deleteDialog, id: "", open: false });
  };

  return (
    <DeleteImageContext.Provider
      value={{ openDialog, closeDialog, modal: deleteDialog }}
    >
      {children}
    </DeleteImageContext.Provider>
  );
};

export const useDeleteImageProvider = () => {
  const context = useContext(DeleteImageContext);
  if (!context) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }
  return context;
};

"use client";
import { createContext, ReactNode, useState } from "react";

interface DialogContextModalDetail {
  open: boolean;
  id: string;
}

interface DialogContextType {
  openDialog: (id: string) => void;
  closeDialog: () => void;
  modal: DialogContextModalDetail;
}

export const DeleteImageContext = createContext<DialogContextType | undefined>(
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

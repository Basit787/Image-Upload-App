"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface ViewImageModalDetail {
  open: boolean;
  imageSrc: string;
  imageId: string;
  imageName: string;
  imageSize: string;
}

interface ViewImageModal {
  onOpen: (src: string, id: string, name: string, size: string) => void;
  onClose: () => void;
  modal: ViewImageModalDetail;
}

const ViewImageContext = createContext<ViewImageModal | undefined>(undefined);

const ViewImageProvider = ({ children }: { children: ReactNode }) => {
  const [imageModalData, setImageModalData] = useState<ViewImageModalDetail>({
    open: false,
    imageSrc: "",
    imageId: "",
    imageName: "",
    imageSize: "",
  });

  const onOpen = (src: string, id: string, name: string, size: string) => {
    setImageModalData({
      ...imageModalData,
      open: true,
      imageSrc: src,
      imageId: id,
      imageName: name,
      imageSize: size,
    });
  };

  const onClose = () => {
    setImageModalData({
      ...imageModalData,
      open: false,
      imageSrc: "",
      imageId: "",
      imageName: "",
      imageSize: "",
    });
  };
  return (
    <ViewImageContext.Provider
      value={{ modal: imageModalData, onOpen, onClose }}
    >
      {children}
    </ViewImageContext.Provider>
  );
};

export default ViewImageProvider;

export const useViewImageContext = () => {
  const context = useContext(ViewImageContext);
  if (!context) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }
  return context;
};

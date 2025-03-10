import DeleteImage from "@/components/image/delete-image";
import SignModeContext from "./authStep/AuthStepProvider";
import { DeleteImageProvider } from "./deleteImage/DeleteImageProvider";
import ViewImageProvider from "./imageView/ImageViewProvider";
import ImagePreview from "@/components/image/image-preview";

const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SignModeContext>
      <ViewImageProvider>
        <DeleteImageProvider>
          <DeleteImage />
          <ImagePreview />
          {children}
        </DeleteImageProvider>
      </ViewImageProvider>
    </SignModeContext>
  );
};

export default ContextProviders;

import DeleteImage from "@/components/image/delete-image";
import SignModeContext from "./AuthStepProvider";
import { DeleteImageProvider } from "./DeleteImageProvider";
import ViewImageProvider from "./ImageViewProvider";
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

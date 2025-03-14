import DeleteImage from "@/components/image/delete-image";
import SignModeContext from "./authStep/AuthStepProvider";
import { DeleteImageProvider } from "./deleteImage/DeleteImageProvider";
import ViewImageProvider from "./imageView/ImageViewProvider";
import ImagePreview from "@/components/image/image-preview";
import AuthProvider from "./login/authProvider";

const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SignModeContext>
      <AuthProvider>
        <ViewImageProvider>
          <DeleteImageProvider>
            <DeleteImage />
            <ImagePreview />
            {children}
          </DeleteImageProvider>
        </ViewImageProvider>
      </AuthProvider>
    </SignModeContext>
  );
};

export default ContextProviders;

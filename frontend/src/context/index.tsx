import DeleteImage from "@/components/image/delete-image";
import ImagePreview from "@/components/image/image-preview";
import AuthProvider from "./auth/auth-provider";
import AuthStepProvider from "./authStepProvider/authStep-provider";
import ViewImageProvider from "./imageViewProvider/imageView-provider";
import { DeleteImageProvider } from "./deleteImageProvider/deleteImage-provider";
import { ThemeProvider } from "./themeProvider/theme-provider";

const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthStepProvider>
        <AuthProvider>
          <ViewImageProvider>
            <DeleteImageProvider>
              <DeleteImage />
              <ImagePreview />
              {children}
            </DeleteImageProvider>
          </ViewImageProvider>
        </AuthProvider>
      </AuthStepProvider>
    </ThemeProvider>
  );
};

export default ContextProviders;

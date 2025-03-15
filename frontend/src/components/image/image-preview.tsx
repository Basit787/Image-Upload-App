import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Download, Trash } from "lucide-react";
import { memo, useCallback } from "react";
import { Lens } from "../lens";
import { useViewImageContext } from "@/context/imageViewProvider/use-imageView";
import { useDeleteImageProvider } from "@/context/deleteImageProvider/use-deleteImage";

const ImagePreview = () => {
  const { modal, onClose } = useViewImageContext();
  const { openDialog } = useDeleteImageProvider();

  return (
    <Dialog open={modal.open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg md:max-w-2xl w-full">
        <div className="flex justify-center items-center">
          <Lens
            zoomFactor={2}
            lensSize={150}
            isStatic={false}
            ariaLabel="Zoom Area"
          >
            <img
              src={modal.imageSrc}
              alt={modal.imageName}
              className="w-full max-w-sm md:max-w-lg h-auto object-contain"
            />
          </Lens>
        </div>
        <DialogFooter>
          <div className="flex flex-row justify-between items-center md:gap-4 w-full">
            <div className="flex flex-col items-start">
              <h3 className="font-medium text-sm max-w-[200px] sm:max-w-none">
                {modal.imageName}
              </h3>
              <p className="text-xs text-muted-foreground">{modal.imageSize}</p>
            </div>
            <div className="flex gap-2 ">
              <a href={modal.imageSrc}>
                <Button variant="secondary" className="mt-3 md:mt-0">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
              </a>
              <Button
                onClick={useCallback(
                  () => openDialog(modal.imageId),
                  [modal, openDialog]
                )}
                variant="destructive"
                className="mt-3 md:mt-0"
              >
                <Trash className="w-4 h-4" />
                <span className="hidden sm:inline">Delete</span>
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(ImagePreview);

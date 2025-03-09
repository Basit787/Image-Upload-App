import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ImageType } from "./image-gallery";

interface ImagePreviewProps {
  image: ImageType | null;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function ImagePreview({
  image,
  onClose,
  onNext,
  onPrevious,
}: ImagePreviewProps) {
  return (
    <Dialog open={!!image} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden bg-background/95 backdrop-blur-sm">
        <div className="relative aspect-auto max-h-[80vh] flex items-center justify-center">
          {image && (
            <>
              <img
                src={image.url || "/placeholder.svg"}
                alt={image.name}
                width={1200}
                height={800}
                className="object-contain max-h-[80vh]"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onPrevious();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-left"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 bg-background/50 hover:bg-background/80 rounded-full"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
        {image && (
          <div className="p-4">
            <h2 className="text-lg font-semibold">{image.name}</h2>
            <div className="flex gap-4 text-sm text-muted-foreground mt-1">
              <p>{image.size}</p>
              <p>{image.type}</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

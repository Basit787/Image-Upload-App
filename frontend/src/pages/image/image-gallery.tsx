import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ImagePreview } from "./image-preview";
import { UploadDialog } from "./upload-image";

// Sample data based on the provided object
const initialImages = [
  {
    id: "24866057-907f-4d27-8271-f6e1e668d2e0",
    userId: "Lpuk4NeQMdYABKgD3LZbUflctqdHDXic",
    key: "1741456720975-Koenigsegg-Agera-RS1-HD-Wallpaper.jpg",
    size: "0.26Mb",
    type: "image/jpeg",
    name: "Koenigsegg-Agera-RS1-HD-Wallpaper.jpg",
    url: "https://image-upload-app-1221.s3.eu-north-1.amazonaws.com/1741456720975-Koenigsegg-Agera-RS1-HD-Wallpaper.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAZKDIC4OVHIJCFMSY%2F20250308%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250308T175844Z&X-Amz-Expires=900&X-Amz-Signature=5d40049dc556a701c498cde08aa13d718af08a7cd61b3deb67cc720576009e89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject",
  },
  // Adding more sample images for demonstration
  {
    id: "34866057-907f-4d27-8271-f6e1e668d2e1",
    userId: "Lpuk4NeQMdYABKgD3LZbUflctqdHDXic",
    key: "sample-car-1.jpg",
    size: "0.31Mb",
    type: "image/jpeg",
    name: "Luxury Sports Car.jpg",
    url: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "44866057-907f-4d27-8271-f6e1e668d2e2",
    userId: "Lpuk4NeQMdYABKgD3LZbUflctqdHDXic",
    key: "sample-car-2.jpg",
    size: "0.28Mb",
    type: "image/jpeg",
    name: "Classic Vintage Car.jpg",
    url: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "54866057-907f-4d27-8271-f6e1e668d2e3",
    userId: "Lpuk4NeQMdYABKgD3LZbUflctqdHDXic",
    key: "sample-car-3.jpg",
    size: "0.33Mb",
    type: "image/jpeg",
    name: "Electric Concept Car.jpg",
    url: "/placeholder.svg?height=300&width=500",
  },
];

export type ImageType = {
  id: string;
  userId: string;
  key: string;
  size: string;
  type: string;
  name: string;
  url: string;
};

export function ImageGallery() {
  const [images, setImages] = useState<ImageType[]>(initialImages);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<ImageType | null>(null);

  const handleAddImage = (newImage: ImageType) => {
    setImages([newImage, ...images]);
  };

  const handleImageClick = (image: ImageType) => {
    setPreviewImage(image);
  };

  const handleNextImage = () => {
    if (!previewImage) return;
    const currentIndex = images.findIndex((img) => img.id === previewImage.id);
    const nextIndex = (currentIndex + 1) % images.length;
    setPreviewImage(images[nextIndex]);
  };

  const handlePreviousImage = () => {
    if (!previewImage) return;
    const currentIndex = images.findIndex((img) => img.id === previewImage.id);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setPreviewImage(images[prevIndex]);
  };

  return (
    <div className="container mx-auto py-8 px-4 relative min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Image Gallery</h1>
        <p className="text-muted-foreground mt-2">
          Upload and manage your images
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <Card
            key={image.id}
            className="overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => handleImageClick(image)}
          >
            <CardContent className="p-0 aspect-square relative">
              <img
                src={image.url || "/placeholder.svg"}
                alt={image.name}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4">
              <h3 className="font-medium text-sm truncate w-full">
                {image.name}
              </h3>
              <p className="text-xs text-muted-foreground">{image.size}</p>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Upload Dialog */}
      <UploadDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onUpload={handleAddImage}
      />

      {/* Image Preview Dialog */}
      <ImagePreview
        image={previewImage}
        onClose={() => setPreviewImage(null)}
        onNext={handleNextImage}
        onPrevious={handlePreviousImage}
      />
    </div>
  );
}

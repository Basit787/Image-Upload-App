import Loading from "@/components/loading";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getAllImages } from "@/services/image.api";
import { useQuery } from "@tanstack/react-query";
import placeholder from "../../assets/placeholder.svg";
import { useViewImageContext } from "@/context/imageView/useImageView";
import { BlurFade } from "@/components/blur-fade";
import { useState } from "react";

export type ImageType = {
  id: string;
  userId: string;
  key: string;
  size: string;
  type: string;
  name: string;
  url: string;
};

const ImageCard = ({
  image,
  onOpen,
}: {
  image: ImageType;
  onOpen: Function;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <Card
      key={image.id}
      className="overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] focus-within:ring-2 focus-within:ring-primary p-0"
      onClick={() => onOpen(image.url, image.id, image.name, image.size)}
    >
      <CardContent className="p-0 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <img
              src={placeholder}
              alt="loading"
              className="w-12 h-12 opacity-50"
            />
          </div>
        )}
        <img
          src={hasError ? placeholder : image.url}
          alt={image.name}
          className={`aspect-square object-cover transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
        <CardFooter className="flex flex-col items-start p-2">
          <h3 className="font-medium text-sm truncate w-full">{image.name}</h3>
          <p className="text-xs text-muted-foreground">{image.size}</p>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

const ImageGallery = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["image"],
    queryFn: () => getAllImages(),
  });

  const { onOpen } = useViewImageContext();

  if (isPending) return <Loading />;
  if (error)
    return (
      <div className="text-center p-8">
        An error has occurred: {error.message}
      </div>
    );

  return (
    <BlurFade
      delay={0.25 * 0.05}
      className={`${
        data.result.length ? "grid" : ""
      } grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 m-4`}
    >
      {data.result.length ? (
        data.result.map((image: ImageType, index: number) => (
          <BlurFade key={image.id} delay={0.25 + index * 0.1}>
            <ImageCard image={image} onOpen={onOpen} />
          </BlurFade>
        ))
      ) : (
        <div className="text-center p-8 text-4xl font-bold">No image added</div>
      )}
    </BlurFade>
  );
};

export default ImageGallery;

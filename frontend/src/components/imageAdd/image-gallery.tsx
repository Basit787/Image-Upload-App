import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getAllImages } from "@/services/image.api";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading";

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
  const { isPending, error, data } = useQuery({
    queryKey: ["image"],
    queryFn: () => getAllImages(),
  });

  if (isPending) return <Loading />;
  if (error)
    return (
      <div className="text-center p-8">
        An error has occurred: {error.message};
      </div>
    );

  console.log(data);
  return (
    <div className="container mx-auto py-8 px-4 relative min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.result.map((image: ImageType) => (
          <Card
            key={image.id}
            className="overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] focus-within:ring-2 focus-within:ring-primary p-0"
          >
            <CardContent className="p-0">
              <img
                src={image.url || "/placeholder.svg"}
                alt={image.name}
                className="aspect-square object-cover"
              />
            </CardContent>
            <CardFooter className="flex flex-col items-start p-3 md:p-4">
              <h3 className="font-medium text-sm truncate w-full">
                {image.name}
              </h3>
              <p className="text-xs text-muted-foreground">{image.size}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

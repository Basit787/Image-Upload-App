import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { queryClient } from "@/services/client";
import { uploadImage } from "@/services/image.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Upload, X } from "lucide-react";
import { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export const FormSchema = z.object({
  image: z
    .custom<File>((file) => file instanceof File, {
      message: "Please upload a valid file",
    })
    .refine((file) => file.size < 2 * 1024 * 1024, {
      message: "Image should be less than 2MB",
    })
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type
        ),
      {
        message: "Only .jpg, .jpeg, .png, and .webp formats are supported",
      }
    ),
});

const ImageUpload = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      image: undefined,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["image"],
    mutationFn: async (data: FormData) => {
      const response = await uploadImage(data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["image"] });
      setDialogOpen(false);
      form.reset();
      setPreviewUrl(null);
      toast("Image added successfully");
    },
    onError: () => {
      toast.error("Failed to add image");
    },
  });

  const onSubmit = useCallback(
    (data: z.infer<typeof FormSchema>) => {
      const formData = new FormData();
      formData.append("image", data.image);
      mutate(formData);
    },
    [mutate]
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full">Add Image</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>
            Select an image from your device to upload to your gallery.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="image-upload" className="cursor-pointer">
                    {previewUrl ? (
                      <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-dashed border-primary/50 flex items-center justify-center">
                        <img
                          src={previewUrl || "/placeholder.svg"}
                          alt="Preview"
                          className="object-contain"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 rounded-full"
                          type="button"
                          onClick={() => {
                            setPreviewUrl(null);
                            form.reset();
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-primary/50 rounded-lg p-12 flex flex-col items-center justify-center gap-2 text-muted-foreground w-full">
                        <Upload className="h-8 w-8" />
                        <p className="font-medium">Click to select an image</p>
                        <p className="text-xs">or drag and drop</p>
                      </div>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                          const url = URL.createObjectURL(file);
                          setPreviewUrl(url);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              Upload <Upload />
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUpload;

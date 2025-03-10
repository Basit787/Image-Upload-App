import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteImageProvider } from "@/context/DeleteImageProvider";
import { useViewImageContext } from "@/context/ImageViewProvider";
import { queryClient } from "@/services/client";
import { deleteImage } from "@/services/image.api";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";

const DeleteImage = () => {
  const { modal, closeDialog } = useDeleteImageProvider();
  const { onClose } = useViewImageContext();

  const { mutate, isPending } = useMutation({
    mutationFn: async (id: string) => {
      return await deleteImage(id);
    },
    onSuccess: (data) => {
      console.log("data", data);
      queryClient.invalidateQueries({ queryKey: ["image"] });
      toast("Image deleted successfully");
      closeDialog();
      onClose();
    },
    onError: (error) => {
      console.log("error", error);
      toast.error("Uh oh! Something went wrong.");
    },
  });

  const handleDelete = useCallback((id: string) => mutate(id), []);

  return (
    <Dialog open={modal.open} onOpenChange={closeDialog}>
      <DialogContent className="w-1/2">
        <DialogHeader>
          <DialogTitle>Delete Image</DialogTitle>
          <DialogDescription>
            Are you sure to delete this image, this process is undo!!!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => handleDelete(modal.id)}
            disabled={isPending}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteImage;

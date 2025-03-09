import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload } from "lucide-react";

export function ImageAdd() {
  return (
    <Dialog>
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

        <div className="border-2 border-dashed border-primary/50 rounded-lg p-12 flex flex-col items-center justify-center gap-2 text-muted-foreground w-full">
          <Upload className="h-8 w-8" />
          <p className="font-medium">Click to select an image</p>
          <p className="text-xs">or drag and drop</p>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="outline">Cancel</Button>
          <Button className="gap-2">
            Upload
            <Upload className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import type React from "react";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ImageType } from "./image-gallery";

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (image: ImageType) => void;
}

export function UploadDialog({
  open,
  onOpenChange,
  onUpload,
}: UploadDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create a preview URL
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Create a new image object
    const newImage: ImageType = {
      id: crypto.randomUUID(),
      userId: "Lpuk4NeQMdYABKgD3LZbUflctqdHDXic",
      key: selectedFile.name,
      size: `${(selectedFile.size / (1024 * 1024)).toFixed(2)}Mb`,
      type: selectedFile.type,
      name: selectedFile.name,
      url: previewUrl || "/placeholder.svg?height=300&width=500",
    };

    // Call the onUpload callback with the new image
    onUpload(newImage);

    // Reset state
    setIsUploading(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    onOpenChange(false);
  };

  const handleCancel = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>
            Select an image from your device to upload to your gallery.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Label htmlFor="image-upload" className="cursor-pointer">
            {previewUrl ? (
              <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-dashed border-primary/50 flex items-center justify-center">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="object-contain"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (previewUrl) {
                      URL.revokeObjectURL(previewUrl);
                    }
                    setSelectedFile(null);
                    setPreviewUrl(null);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-primary/50 rounded-lg p-12 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                <Upload className="h-8 w-8" />
                <p className="font-medium">Click to select an image</p>
                <p className="text-xs">or drag and drop</p>
              </div>
            )}
          </Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {selectedFile && (
            <div className="text-sm">
              <p>
                <span className="font-medium">Name:</span> {selectedFile.name}
              </p>
              <p>
                <span className="font-medium">Size:</span>{" "}
                {(selectedFile.size / (1024 * 1024)).toFixed(2)}MB
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="gap-2"
          >
            {isUploading ? "Uploading..." : "Upload"}
            {!isUploading && <Upload className="h-4 w-4" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

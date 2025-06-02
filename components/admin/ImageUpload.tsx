import { useState, useRef } from "react";

interface ImageUploadProps {
  images: File[];
  setImages: (images: File[]) => void;
  existingImages: string[];
  setExistingImages: (images: string[]) => void;
}

export default function ImageUpload({
  images,
  setImages,
  existingImages,
  setExistingImages,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newImages = Array.from(files);
    setImages([...images, ...newImages]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const removeImage = (index: number, isExisting: boolean) => {
    if (isExisting) {
      setExistingImages(existingImages.filter((_, i) => i !== index));
    } else {
      setImages(images.filter((_, i) => i !== index));
    }
  };

  const totalImages = existingImages.length + images.length;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Ground Images (Max 5)</h3>

      {/* Upload Area */}
      {totalImages < 5 && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
          <div className="text-gray-600">
            <p>Drag and drop images here or</p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              click to browse
            </button>
            <p className="text-sm mt-1">{5 - totalImages} image(s) remaining</p>
          </div>
        </div>
      )}

      {/* Image Preview */}
      {totalImages > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {/* Existing Images */}
          {existingImages.map((image, index) => (
            <div key={`existing-${index}`} className="relative">
              <img
                src={image}
                alt={`Ground image ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index, true)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}

          {/* New Images */}
          {images.map((image, index) => (
            <div key={`new-${index}`} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt={`New ground image ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index, false)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

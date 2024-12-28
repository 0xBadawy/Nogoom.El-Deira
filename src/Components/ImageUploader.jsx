import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../Configuration/Firebase"

const ImageUploader = ({ onUpload }) => {
  const [preview, setPreview] = useState(null); // For image preview
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show image preview
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);
    setError(null);

    uploadTask.on(
      "state_changed",
      null,
      (err) => {
        setUploading(false);
        setError("Failed to upload image.");
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        onUpload(downloadURL); // Pass the URL back to the parent
        setUploading(false);
      }
    );
  };

  return (
    <div className="flex flex-col items-center">
      <label className="block">
        <span className="sr-only">Choose an image</span>
        <input
          type="file"
          accept="image/*"
          className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
          onChange={handleFileChange}
        />
      </label>

      {/* Preview Image */}
      {preview && (
        <img
          src={preview}
          alt="Selected"
          className="mt-4 w-32 h-32 object-cover rounded border"
        />
      )}

      {uploading && <p className="mt-2 text-blue-500">Uploading...</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default ImageUploader;

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function DropzoneUploader({ onUpload }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
          onUpload(reader.result);
        };
        reader.onerror = () => console.error('Error reading file');
        reader.readAsDataURL(file);
      }
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border-4 border-dashed p-6 rounded-lg text-center cursor-pointer"
    >
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop your wallpaper here ...</p> : <p>Drag & drop an image, or click to select one</p>}
    </div>
  );
}
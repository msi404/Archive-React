import { Image } from '@unpic/react';
import { Icon } from '@iconify/react';
import { FC, useMemo, useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FieldError } from 'react-hook-form';

// Helper to format bytes
function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const baseStyle: React.CSSProperties = {
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center', // Center content vertically
	padding: '20px',
	borderWidth: 2,
	borderRadius: 8, // Use border radius from theme potentially
	borderColor: 'hsl(var(--border))',
	borderStyle: 'dashed',
	backgroundColor: 'hsl(var(--background))',
	color: 'hsl(var(--muted-foreground))',
	outline: 'none',
	transition: 'border .24s ease-in-out',
	minHeight: '100px' // Ensure minimum height
};

const focusedStyle = { borderColor: 'hsl(var(--primary))' };
const acceptStyle = { borderColor: 'hsl(var(--success))', backgroundColor: 'hsl(var(--accent))' }; // Use theme colors
const rejectStyle = { borderColor: 'hsl(var(--destructive))', backgroundColor: 'hsl(var(--accent))' }; // Use theme colors

type UploadedFile = {
  file: File; // Store the original File object
  preview: string;
};

type DropzoneProps = {
  label: string;
  setFile: (files: File[] | null) => void; // Parent expects File objects
  error?: FieldError;
  defaultImage?: string;
  multiple?: boolean;
};

export const Dropzone: FC<DropzoneProps> = ({ label, setFile, error, defaultImage, multiple = false }) => {
  const [uploadedFilePreviews, setUploadedFilePreviews] = useState<UploadedFile[]>([]);

  // Store the actual File objects to pass to the parent
  const [currentFiles, setCurrentFiles] = useState<File[]>([]); 

  useEffect(() => {
    // Handle initial default image (less common for multi-upload)
    if (defaultImage && uploadedFilePreviews.length === 0) {
      // Create a dummy File object if needed, or adjust logic based on how defaultImage is used
      const dummyFile = new File([""], "default_image.png", { type: "image/png" });
      setUploadedFilePreviews([{ file: dummyFile, preview: defaultImage }]);
      // Don't set currentFiles here unless defaultImage represents a real initial file
    }
    // Cleanup logic if defaultImage is removed
    if (!defaultImage && uploadedFilePreviews.length === 1 && uploadedFilePreviews[0].file.name === 'default_image.png') {
        setUploadedFilePreviews([]);
        setCurrentFiles([]);
        setFile(null); // Inform parent
    }

    // Cleanup object URLs on unmount
    return () => uploadedFilePreviews.forEach(upFile => URL.revokeObjectURL(upFile.preview));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultImage]); // Rerun only if defaultImage changes

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log('Files dropped:', acceptedFiles);
      const newPreviews = acceptedFiles.map((file) => ({
        file: file, // Store the original file
        preview: URL.createObjectURL(file)
      }));

      let nextPreviews: UploadedFile[];
      let nextFiles: File[];

      if (multiple) {
        nextPreviews = [...uploadedFilePreviews, ...newPreviews];
        nextFiles = [...currentFiles, ...acceptedFiles];
      } else {
        // Revoke previous URLs before replacing
        uploadedFilePreviews.forEach(upFile => URL.revokeObjectURL(upFile.preview));
        nextPreviews = newPreviews;
        nextFiles = acceptedFiles;
      }

      setUploadedFilePreviews(nextPreviews);
      setCurrentFiles(nextFiles); 
      setFile(nextFiles.length > 0 ? nextFiles : null); // Update parent with File objects
      console.log('Updated previews state:', nextPreviews);
    },
    [multiple, setFile, uploadedFilePreviews, currentFiles] // Include currentFiles dependency
  );

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: { 'image/*': [] },
      maxFiles: multiple ? 15 : 1,
      multiple: multiple,
      onDrop,
      disabled: !multiple && uploadedFilePreviews.length > 0 && uploadedFilePreviews[0]?.file.name !== 'default_image.png'
    });

  const style: React.CSSProperties = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
      ...(error ? { borderColor: 'hsl(var(--destructive))' } : {}),
      ...(!multiple && uploadedFilePreviews.length > 0 && uploadedFilePreviews[0]?.file.name !== 'default_image.png' ? { pointerEvents: 'none', opacity: 0.6 } : {}),
    }),
    [isFocused, isDragAccept, isDragReject, error, multiple, uploadedFilePreviews]
  );

  const handleRemove = (indexToRemove: number) => {
    console.log('Removing file at index:', indexToRemove);
    // Revoke the specific object URL
    const fileToRemove = uploadedFilePreviews[indexToRemove];
    if (fileToRemove && fileToRemove.file.name !== 'default_image.png') {
         URL.revokeObjectURL(fileToRemove.preview);
    }

    const nextPreviews = uploadedFilePreviews.filter((_, index) => index !== indexToRemove);
    const nextFiles = currentFiles.filter((_, index) => index !== indexToRemove);

    setUploadedFilePreviews(nextPreviews);
    setCurrentFiles(nextFiles);
    setFile(nextFiles.length > 0 ? nextFiles : null); // Update parent
    console.log('Updated previews after removal:', nextPreviews);

  };

  console.log('Rendering Dropzone, previews:', uploadedFilePreviews);

  return (
    <div className="w-full space-y-3">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <Icon icon="solar:cloud-upload-bold-duotone" className="w-10 h-10 mb-2" />
        <p className="text-center text-sm">{label}</p>
      </div>
      {/* List of Thumbnails */}
      {uploadedFilePreviews.length > 0 && (
         <div className="space-y-2">
            {uploadedFilePreviews.map((upFile, index) => (
                <div
                    key={upFile.preview} // Use preview URL as key (should be unique)
                    className="flex items-center justify-between p-2 border border-border rounded-md bg-card text-card-foreground shadow-sm"
                >
                    <div className="flex items-center gap-3 flex-grow min-w-0">
                        <Image
                            src={upFile.preview}
                            width={40}
                            height={40}
                            alt={upFile.file.name}
                            className="rounded aspect-square object-cover flex-shrink-0"
                        />
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-medium truncate">{upFile.file.name === 'default_image.png' ? 'مرفق' : upFile.file.name}</span>
                            {upFile.file.size > 0 && <span className="text-xs text-muted-foreground">{formatBytes(upFile.file.size)}</span>}
                        </div>
                    </div>
                    <button
                        type="button"
                        className="p-1 text-destructive hover:bg-destructive/10 rounded disabled:opacity-50 flex-shrink-0 ml-2"
                        onClick={() => handleRemove(index)}
                        aria-label={`Remove ${upFile.file.name}`}
                    >
                        <Icon icon="solar:trash-bin-2-bold-duotone" className="w-5 h-5" />
                    </button>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};
import { Image } from '@unpic/react';
import { Icon } from '@iconify/react';
import { FC, useMemo, useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FieldError } from 'react-hook-form';

const baseStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = { borderColor: '#2196f3' };
const acceptStyle = { borderColor: '#00e676' };
const rejectStyle = { borderColor: '#ff1744' };

type DropzoneProps = {
  label: string;
  setFile: (files: File[] | null) => void;
  error?: FieldError;
  defaultImage?: string;
  multiple?: boolean;
};

export const Dropzone: FC<DropzoneProps> = ({ label, setFile, error, defaultImage, multiple = false }) => {
  const [files, setFiles] = useState<{ preview: string }[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<{ preview: string }[]>([]);

  useEffect(() => {
    if (defaultImage) {
      setUploadedFiles([{ preview: defaultImage }]);
    }
  }, [defaultImage]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const updatedFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      if (multiple) {
        setUploadedFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
      } else {
        setUploadedFiles([...updatedFiles]);
      }

      setFile(acceptedFiles);
      setFiles([]);
    },
    [multiple, setFile]
  );

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 15,
    multiple: multiple,
    onDrop,
    disabled: !multiple && uploadedFiles.length > 0,
  });

  const style: React.CSSProperties = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
      ...(error ? { borderColor: '#ff1744' } : {}),
      ...(!multiple && uploadedFiles.length > 0 ? { pointerEvents: 'none', opacity: 0.6 } : {}),
    }),
    [isFocused, isDragAccept, isDragReject, error, multiple, uploadedFiles.length]
  );

  const handleRemove = (index: number) => {
    setUploadedFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleReplace = () => {
    setUploadedFiles([]);
  };

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {!files.length && <p>{label}</p>}
      </div>
      <div className="flex flex-wrap gap-5 mt-5">
        {uploadedFiles.map((file, index) => (
          <div key={ file.preview } style={ { position: 'relative' } }>
          
            <Image src={file.preview} width={350} height={200} alt="Preview" onClick={!multiple ? handleReplace : undefined} style={{cursor: !multiple ? 'pointer' : 'default'}}/>
            <button
              type="button"
              className="w-full h-16 flex justify-center gap-5 items-center"
              style={{ position: 'absolute', top: '0', right: '0', background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}
              onClick={() => handleRemove(index)}
            >
              <Icon icon="solar:trash-bin-2-bold-duotone" />
              <span style={{ marginLeft: '8px' }}>حذف</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
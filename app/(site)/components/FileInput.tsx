import React from 'react';
import { InputFileType } from '@/app/types';

interface FileInputProps {
  handleFile: (file: InputFileType) => void;
}

const FileInput: React.FC<FileInputProps> = ({ handleFile }) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        display: 'inline-block',
        padding: '0.5rem 1rem',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer',
        userSelect: 'none',
        textAlign: 'center',
      }}
    >
      <input
        id="fileInput"
        type="file"
        accept=".xlsx"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />
      <label htmlFor="fileInput">Drag and drop or click to browse for an XLSX file</label>
    </div>
  );
};

export default FileInput;

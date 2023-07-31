"use client";

import { InputFileType } from "@/app/types";

interface FileInputProps {
  handleFile: (file: InputFileType) => void;
}

const FileInput: React.FC<FileInputProps> = ({ handleFile }) => {
  return (
    <div>
      <input
        id="fileInput"
        type="file"
        accept=".xlsx"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0])
            handleFile(e.target.files[0]);
        }}
      />
    </div>
  );
};

export default FileInput;

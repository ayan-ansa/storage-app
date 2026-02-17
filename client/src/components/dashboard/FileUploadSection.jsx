import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { uploadFile, uploadFiles } from "@/apis/uploadApi";
import { toast } from "sonner";
import Modal from "@/components/modals/Modal";

const FILE_SIZE_LIMIT = 200 * 1024 * 1024; // 200MB

export default function FileUploadSection({ setActionDone, dirId }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isFileSizeError, setIsFileSizeError] = useState(false);
  const fileInputRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleMultiFileUpload(files);
    }
  };

  const handleSingleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadFile(dirId, formData, (progress) => {
        setUploadProgress(progress);
      });
      if (response.success) {
        toast.success(response.message);
        setActionDone();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploadProgress(0);
    }
  };

  async function handleMultiFileUpload(files) {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await uploadFiles(dirId, formData, (progress) => {
        setUploadProgress(progress);
      });
      if (response.success) {
        toast.success(response.message);
        setActionDone();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setUploadProgress(0);
    }
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);

    const fileSizeExceedsLimit = files.some(
      (file) => file.size > FILE_SIZE_LIMIT,
    );
    if (fileSizeExceedsLimit) {
      setIsFileSizeError(true);
      return;
    }
    if (files.length > 1) {
      handleMultiFileUpload(files);
    } else if (files.length === 1) {
      handleSingleFileUpload(files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${
        isDragging
          ? "border-blue-500 bg-blue-500/10"
          : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileSelect}
        disabled={uploadProgress > 0}
        className="hidden"
      />

      <div className="text-center">
        <div
          className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            isDragging ? "bg-blue-500/20" : "bg-slate-700"
          }`}
        >
          <Upload
            className={`w-8 h-8 ${isDragging ? "text-blue-400" : "text-slate-400"}`}
          />
        </div>

        <h3 className="text-lg font-semibold text-slate-200 mb-2">
          {isDragging ? "Drop files here" : "Drag & drop files here"}
        </h3>
        <p className="text-slate-400 mb-4">or</p>

        <Button
          onClick={handleUploadClick}
          disabled={uploadProgress > 0}
          className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Files
        </Button>
      </div>
      {uploadProgress > 0 && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-700 rounded-b-xl overflow-hidden mt-4">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      <Modal
        isOpen={isFileSizeError}
        onClose={() => setIsFileSizeError(false)}
      />
    </div>
  );
}

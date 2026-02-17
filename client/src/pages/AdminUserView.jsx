import { File, Folder } from "lucide-react";
import FilePreviewModal from "../components/modals/FilePreviewModal";
import Header from "../components/AdminHeader";
import { ItemCard } from "../components/admin-user-view/ItemCard";
// import Breadcrumb from "./Breadcrumb";
import useAdminUserView from "../hooks/useAdminUserView";
import Breadcrumb from "@/components/dashboard/Breadcrumb ";
import { Card } from "@/components/ui/card";

export default function AdminUserView() {
  const {
    directories,
    files,
    loading,
    currentPath,
    targetUser,
    previewFile,
    hasDirectories,
    hasFiles,
    isEmpty,
    handleDirectoryClick,
    // handleBreadcrumbClick,
    closeFilePreview,
    setPreviewFile,
  } = useAdminUserView();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-[#0a1628] p-8">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <Header
          currentUser={targetUser}
          backToText={"Panel"}
          backToPath={"/users"}
        />

        <div className="mb-4">
          <Breadcrumb
            currentPath={currentPath}
            // onBreadcrumbClick={handleBreadcrumbClick}
            // homeLabel="Root"
          />
        </div>

        {/* Main Content */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          {/* Directories Section */}
          {hasDirectories && (
            <div className="p-6 border-b border-gray-500">
              <h2 className="text-lg font-medium mb-4 text-gray-300 flex items-center">
                <Folder className="w-5 h-5 mr-2 text-blue-600" />
                Directories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {directories.map((directory) => (
                  <ItemCard
                    key={directory._id}
                    item={directory}
                    type="directory"
                    onClick={handleDirectoryClick}
                    setPreviewFile={setPreviewFile}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Files Section */}
          {hasFiles && (
            <div className="p-6">
              <h2 className="text-lg font-medium mb-4 text-gray-300 flex items-center">
                <File className="w-5 h-5 mr-2 text-gray-500" />
                Files
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {files.map((file) => (
                  <ItemCard
                    key={file._id}
                    item={file}
                    type="file"
                    setPreviewFile={setPreviewFile}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {isEmpty && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Folder className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-300 mb-2">
                This directory is empty
              </h3>
              <p className="text-gray-400">No files or directories found</p>
            </div>
          )}
        </Card>
      </div>

      {/* File Preview Modal */}
      {previewFile && (
        <FilePreviewModal file={previewFile} onClose={closeFilePreview} />
      )}
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import Toolbar from "./Toolbar";
import Breadcrumb from "./Breadcrumb ";
import GridView from "./GridView";
import ListView from "./ListView";
import { useState } from "react";
import { Folder } from "lucide-react";
import FileDetailsModal from "@/components/modals/FileDetailsModal";
import RenameDialog from "./RenameDialog";
import {
  deleteFileOrDirectory,
  renameFileOrDirectory,
} from "@/apis/dirFileApi";
import { toast } from "sonner";
import { useModal } from "@/contexts/ModalContext";

const DirectoryView = ({ loading, allItems, currentPath, setActionDone }) => {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name"); // 'name', 'size', 'modified'
  const { showConfirmModal, showModal, closeConfirmModal } = useModal();

  const [detailsModal, setDetailsModal] = useState({
    isOpen: false,
    item: null,
  });
  const [renameDialog, setRenameDialog] = useState({
    isOpen: false,
    item: null,
  });
  const navigate = useNavigate();

  const handleRename = async (item, newName) => {
    try {
      const response = await renameFileOrDirectory(item, newName);
      if (response.success) {
        toast.success(response.message);
        setActionDone();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred while renaming");
    }
  };

  const handleDelete = async (item) => {
    showConfirmModal(
      "Delete " + item.type,
      `Are you sure you want to delete ${item.name}?`,
      async () => {
        try {
          const res = await deleteFileOrDirectory(item);
          if (res.success) {
            showModal("Success", `${item.name} has been deleted!`, "success");
            // setActiveDropdown(null);
            setActionDone();
            closeConfirmModal();
          } else {
            showModal("Error", "Failed to delete " + item.name, "error");
          }
        } catch {
          showModal("Error", "Failed to delete " + item.name, "error");
        }
      },
      "warning",
    );
  };

  const handleFileAction = (action, item) => {
    switch (action) {
      case "details":
        setDetailsModal({ isOpen: true, item });
        break;
      case "download":
        if (item.type === "file") {
          window.open(
            `${import.meta.env.VITE_BASE_URL}/file/${item._id}?action=download`,
            "_blank",
          );
        }
        break;
      case "share":
        console.log("Share:", item);
        // TODO: Open share modal
        break;
      case "rename":
        // TODO: Open rename dialog
        setRenameDialog({ isOpen: true, item });
        break;
      case "delete":
        handleDelete(item);
        break;
      default:
        console.log("Unknown action:", action);
    }
  };

  const handleOpen = (item) => {
    if (item.type === "directory") {
      navigate(`/directory/${item._id}`);
    } else {
      window.open(
        `${import.meta.env.VITE_BASE_URL}/file/${item._id}`,
        "_blank",
      );
    }
  };

  return (
    <div className="space-y-4">
      <Toolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <Breadcrumb currentPath={currentPath} />
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        </div>
      ) : allItems.length > 0 ? (
        <>
          {viewMode === "grid" ? (
            <GridView
              items={allItems}
              handleOpen={handleOpen}
              handleFileAction={handleFileAction}
            />
          ) : (
            <ListView
              items={allItems}
              handleOpen={handleOpen}
              handleFileAction={handleFileAction}
            />
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-300 mb-2">
            {searchQuery ? "No results found" : "No files or folders"}
          </h3>
          <p className="text-gray-500">
            {searchQuery
              ? `No items match "${searchQuery}". Try a different search term.`
              : "Upload some files or create a directory to get started"}
          </p>
        </div>
      )}

      <FileDetailsModal
        item={detailsModal.item}
        isOpen={detailsModal.isOpen}
        onClose={() => setDetailsModal({ isOpen: false, item: null })}
      />
      <RenameDialog
        item={renameDialog.item}
        open={renameDialog.isOpen}
        onClose={() => setRenameDialog({ isOpen: false, item: null })}
        onRename={handleRename}
      />
    </div>
  );
};

export default DirectoryView;

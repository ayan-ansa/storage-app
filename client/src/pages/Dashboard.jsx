import Sidebar from "../components/dashboard/Sidebar";
import CreateFolderDialog from "../components/dashboard/CreateFolderDialog";

import DirectoryView from "@/components/dashboard/DirectoryView";
import FileUploadSection from "@/components/dashboard/FileUploadSection";
import useDirectory from "@/hooks/useDirectory";

export function Dashboard() {
  const {
    allItems,
    dirId,
    loading,
    currentPath,
    showCreateModal,
    setShowCreateModal,
    handleCreateModalClose,
    handleActionComplete,
    handleCreateSuccess,
  } = useDirectory();

  // const filteredFiles = files.filter((file) =>
  //   file.name.toLowerCase().includes(searchQuery.toLowerCase()),
  // );

  // const sortedFiles = [...filteredFiles].sort((a, b) => {
  //   if (sortBy === "name") {
  //     return a.name.localeCompare(b.name);
  //   } else if (sortBy === "size") {
  //     const sizeA = parseFloat(a.size) || 0;
  //     const sizeB = parseFloat(b.size) || 0;
  //     return sizeB - sizeA;
  //   } else if (sortBy === "modified") {
  //     return new Date(b.modified) - new Date(a.modified);
  //   }
  //   return 0;
  // });

  // const filteredAndSortedItems = useMemo(() => {
  //   const filtered = allItems.filter((item) =>
  //     item.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  //   );
  // });

  return (
    <>
      <div className="flex h-full overflow-hidden">
        <Sidebar onOpenFolderDialog={() => setShowCreateModal(true)} />

        <main className="flex-1 overflow-y-auto p-6 space-y-4">
          <FileUploadSection
            setActionDone={handleActionComplete}
            dirId={dirId}
          />

          <DirectoryView
            loading={loading}
            allItems={allItems}
            currentPath={currentPath}
            setActionDone={handleActionComplete}
          />
        </main>
      </div>

      {showCreateModal && (
        <CreateFolderDialog
          open={showCreateModal}
          onClose={handleCreateModalClose}
          onCreateFolder={handleCreateSuccess}
          dirId={dirId}
        />
      )}
    </>
  );
}

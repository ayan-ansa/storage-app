import { getItemList } from "@/apis/dirFileApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useDirectory = () => {
  const { dirId } = useParams();
  const [allItems, setAllItems] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [actionDone, setActionDone] = useState(false);
  const [currentPath, setCurrentPath] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDirectoryItems = async () => {
    setLoading(true);

    try {
      const data = await getItemList(dirId);
      if (data.success) {
        setAllItems([...data.directories, ...data.files]);
        setCurrentPath(data.name);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      setError(
        error.message || "An error occurred while fetching directory items",
      );
      console.error("Error fetching directory items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectoryItems();
  }, [dirId, actionDone]);

  // Modal handlers
  const handleCreateModalOpen = () => setShowCreateModal(true);
  const handleCreateModalClose = () => setShowCreateModal(false);
  const handleCreateSuccess = () => {
    setShowCreateModal(false);
    setActionDone(!actionDone);
  };

  const handleActionComplete = () => setActionDone(!actionDone);
  const refreshDirectory = () => setActionDone(true);

  return {
    allItems,
    loading,
    showCreateModal,
    setShowCreateModal,
    handleCreateModalOpen,
    handleCreateModalClose,
    handleCreateSuccess,
    handleActionComplete,
    refreshDirectory,
    dirId,
    currentPath,
    error,
  };
};

export default useDirectory;

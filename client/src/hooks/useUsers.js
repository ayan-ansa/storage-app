import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllUsers,
  changeRole,
  hardDeleteUser,
  logout,
  recover,
  softDeleteUser,
} from "../apis/adminApi";
import { useModal } from "../contexts/ModalContext";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  //   const [role, setRole] = useState("User");
  //   const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { showModal, showConfirmModal, closeConfirmModal } = useModal();

  const fetchUsers = async () => {
    setLoading(true);
    const res = await getAllUsers();
    if (res.success) {
      setUsers(res.users);
      //   setRole(res.data.currentUser.role);
      //   setCurrentUser(res.data.currentUser);
      setError(null);
    } else {
      setError(res.message);
      setUsers([]);
      showModal("Error", res.message || "Failed to fetch users", "error");
      setTimeout(() => navigate("/"), 2000);
    }
    setLoading(false);
  };

  const handleLogout = async (userId) => {
    const user = users.find((u) => u._id === userId);
    const userName = user ? user.name : "this user";

    showConfirmModal(
      "Confirm Logout",
      `Are you sure you want to logout ${userName}? This will end their all sessions.`,
      async () => {
        const res = await logout(userId);
        if (res.success) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === userId ? { ...user, isLoggedIn: false } : user,
            ),
          );
          showModal("Success", "User logged out successfully", "success");
        } else {
          showModal("Error", res.message || "Failed to logout user", "error");
          console.error("Error logging out user:", res.message);
        }
        closeConfirmModal();
      },
      "warning",
    );
  };

  // soft delete
  const handleSoftDelete = async (userId) => {
    const user = users.find((u) => u._id === userId);
    const userName = user ? user.name : "this user";
    showConfirmModal(
      "Confirm Soft Delete",
      `Are you sure you want to soft delete ${userName}? This will deactivate their account but data can be recovered.`,
      async () => {
        const res = await softDeleteUser(userId);
        if (res.success) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === userId ? { ...user, isDeleted: true } : user,
            ),
          );
          showModal("Success", "User soft deleted successfully", "success");
        } else {
          showModal(
            "Error",
            res.message || "Failed to soft delete user",
            "error",
          );
          console.error("Error soft deleting user:", res.message);
        }
        closeConfirmModal();
      },
      "warning",
    );
  };

  // console.log("useUsers hook: ", users);
  // hard delete
  const handleHardDelete = async (userId) => {
    console.log("Hard deleting user with ID:", userId);
    const user = users.find((u) => u._id === userId);
    const userName = user ? user.name : "this user";

    showConfirmModal(
      "Confirm Hard Delete",
      `Are you sure you want to permanently delete ${userName}? This action cannot be undone and will remove all their data.`,
      async () => {
        const res = await hardDeleteUser(userId);
        if (res.success) {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user._id !== userId),
          );
          showModal(
            "Success",
            "User permanently deleted successfully",
            "success",
          );
        } else {
          showModal(
            "Error",
            res.message || "Failed to hard delete user",
            "error",
          );
          console.error("Error hard deleting user:", res.message);
        }
        closeConfirmModal();
      },
      "danger",
    );
  };


  const handleRecover = async (userId) => {
    const user = users.find((u) => u._id === userId);
    const userName = user ? user.name : "this user";

    showConfirmModal(
      "Confirm Recovery",
      `Are you sure you want to recover ${userName}? This will reactivate their account and restore access.`,
      async () => {
        const res = await recover(userId);
        if (res.success) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === userId ? { ...user, isDeleted: false } : user,
            ),
          );
          showModal("Success", "User recovered successfully", "success");
        } else {
          showModal("Error", res.message || "Failed to recover user", "error");
          console.error("Error recovering user:", res.message);
        }
        closeConfirmModal();
      },
      "info",
    );
  };

  const handleChangeRole = async (userId, role) => {
    const user = users.find((u) => u._id === userId);
    const userName = user ? user.name : "this user";

    showConfirmModal(
      "Confirm Change Role",
      `Are you sure you want to change the role of ${userName} to ${role} ?`,
      async () => {
        const res = await changeRole(userId, role);
        if (res.success) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === userId ? { ...user, role: role } : user,
            ),
          );
          showModal("Success", "User role changed successfully", "success");
        } else {
          showModal(
            "Error",
            res.message || "Failed to change user role",
            "error",
          );
          console.error("Error recovering user:", res.message);
        }
        closeConfirmModal();
      },
      "info",
    );
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    handleLogout,
    handleSoftDelete,
    handleHardDelete,
    handleRecover,
    handleChangeRole,
  };
};

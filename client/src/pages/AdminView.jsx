import { useState } from "react";
import { Users, UserCheck, Zap, UserX } from "lucide-react";
import StatsCard from "../components/admin-view/StatsCard";
import UserTable from "../components/admin-view/Table";
import EditRoleDialog from "../components/admin-view/EditRoleDialog";
import DeleteUserDialog from "../components/admin-view/DeleteUserDialog";

import Header from "@/components/AdminHeader";
import { useAuth } from "@/contexts/AuthContext";
import { useUsers } from "@/hooks/useUsers";

export default function AdminView() {
  const [deleteUser, setDeleteUser] = useState(null);
  const [editRoleUser, setEditRoleUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const {
    users,
    fetchUsers,
    handleLogout,
    handleSoftDelete,
    handleHardDelete,
    handleRecover,
    handleChangeRole,
  } = useUsers();
  const { currentUser } = useAuth();

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Active Users",
      value: users.filter((u) => !u.isDeleted).length,
      icon: UserCheck,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Online Users",
      value: users.filter((u) => u.isLoggedIn).length,
      icon: Zap,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Deleted Users",
      value: users.filter((u) => u.isDeleted).length,
      icon: UserX,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
    },
  ];

  
  const handleEditRole = (user) => {
    setEditRoleUser(user);
    setSelectedRole(user.role);
  };

  const handleUpdateRole = async () => {
    await handleChangeRole(editRoleUser._id, selectedRole);
    setEditRoleUser(null);
    setSelectedRole("");
  };

  const handleDeleteChoice = async (choice, userId) => {
    if (choice === "soft") {
      await handleSoftDelete(userId);
    } else if (choice === "hard") {
      await handleHardDelete(userId);
    }
    setDeleteUser(null);
  };

  return (
    <div className="h-full overflow-y-auto bg-[#0a1628] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Header
          currentUser={currentUser}
          backToText={"Dashboard"}
          backToPath={"/dashboard"}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <UserTable
          users={users}
          currentUser={currentUser}
          onRefresh={fetchUsers}
          onEditRole={handleEditRole}
          onLogout={handleLogout}
          onRecover={handleRecover}
          onDelete={setDeleteUser}
        />
      </div>

      {/* Edit Role Dialog */}
      <EditRoleDialog
        user={editRoleUser}
        isOpen={editRoleUser !== null}
        onClose={() => setEditRoleUser(null)}
        onUpdate={handleUpdateRole}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />

      {/* Delete User Dialog */}
      <DeleteUserDialog
        user={deleteUser}
        isOpen={deleteUser !== null}
        onClose={() => setDeleteUser(null)}
        onDelete={handleDeleteChoice}
      />
    </div>
  );
}

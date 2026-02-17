import { Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import { useState } from "react";

export default function Table({
  users,
  currentUser,
  onRefresh,
  onEditRole,
  onRecover,
  onLogout,
  onDelete,
}) {
  const [filter, setFilter] = useState("all");

  const filteredUsers = () => {
    switch (filter) {
      case "active":
        return users.filter((u) => !u.isDeleted);
      case "deleted":
        return users.filter((u) => u.isDeleted);
      case "admin":
        return users.filter(
          (u) => u.role === "admin" || u.role === "superadmin",
        );
      case "regular":
        return users.filter((u) => u.role === "user");
      case "online":
        return users.filter((u) => u.isLoggedIn);
      default:
        return users;
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <TableHeader
        filter={filter}
        setFilter={setFilter}
        onRefresh={onRefresh}
      />

      <div className="overflow-x-auto">
        {filteredUsers().length === 0 ? (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-slate-600 mb-3" />
            <p className="text-slate-400 text-lg font-medium">No users found</p>
            <p className="text-slate-500 text-sm mt-1">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredUsers().map((user) => (
                <TableRow
                  key={user._id}
                  user={user}
                  currentUser={currentUser}
                  
                  onEditRole={onEditRole}
                  onRecover={onRecover}
                  onLogout={onLogout}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Card>
  );
}

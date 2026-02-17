import {
  Eye,
  LogOut,
  Trash2,
  MoreVertical,
  UserCog,
  RotateCcw,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { userPermissions } from "@/utils/userPermissions";
import { useNavigate } from "react-router-dom";

export default function TableRow({
  user,
  currentUser,
  onEditRole,
  onLogout,
  onDelete,
  onRecover,
}) {
  const navigate = useNavigate();
  const { canView, canEditRole, canDelete, canRecover, canLogout } =
    userPermissions(currentUser);
  return (
    <tr className="hover:bg-slate-700/30 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-slate-700">
            <AvatarImage src={user?.picture} alt={user?.name} />
          </Avatar>
          <div>
            <p className="font-semibold text-white">{user?.name}</p>
            <p className="text-sm text-slate-400">{user?.email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <Badge
          variant="secondary"
          className={`font-medium ${user?.role === "superadmin" ? "bg-purple-500/20 text-purple-300 border-purple-500/30" : user?.role === "admin" ? "bg-blue-500/20 text-blue-300 border-blue-500/30" : user.role === "manager" ? "bg-amber-500/20 text-amber-300 border-amber-500/30" : "bg-slate-500/20 text-slate-300 border-slate-500/30"}`}
        >
          {user?.role}
        </Badge>
      </td>
      <td className="px-6 py-4">
        <Badge
          variant={user?.isLoggedIn ? "default" : "outline"}
          className={
            user?.isLoggedIn
              ? "bg-green-500/20 text-green-400 border-green-500/30"
              : "border-slate-600 text-slate-400"
          }
        >
          <span
            className={`w-2 h-2 rounded-full mr-1.5 ${
              user?.isLoggedIn ? "bg-green-400" : "bg-slate-500"
            }`}
          ></span>
          {user?.isLoggedIn ? "Logged In" : "Logged Out"}
        </Badge>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {canView(user) && (
                <DropdownMenuItem
                  onClick={() => navigate(`/users/${user._id}`)}
                >
                  <Eye className="mr-2 h-4 w-4 text-blue-400" />
                  <span>View</span>
                </DropdownMenuItem>
              )}

              {canEditRole(user) && (
                <DropdownMenuItem onClick={() => onEditRole(user)}>
                  <UserCog className="mr-2 h-4 w-4 text-purple-400" />
                  <span>Edit Role</span>
                </DropdownMenuItem>
              )}
              {canLogout(user) && (
                <DropdownMenuItem onClick={() => onLogout(user._id)}>
                  <LogOut className="mr-2 h-4 w-4 text-amber-400" />
                  <span>Logout</span>
                </DropdownMenuItem>
              )}
              {canRecover(user) && (
                <>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem onClick={() => onRecover(user._id)}>
                    <RotateCcw className="mr-2 h-4 w-4 text-green-400" />
                    <span>Recover</span>
                  </DropdownMenuItem>
                </>
              )}
              {canDelete(user) && (
                <DropdownMenuItem onClick={() => onDelete(user)}>
                  <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                  <span className="text-red-500">Delete</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  );
}

import { UserCog, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function EditRoleDialog({
  user,
  isOpen,
  onClose,
  selectedRole,
  setSelectedRole,
  onUpdate,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-0 shadow-2xl max-w-md">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100"
        >
          <X className="h-4 w-4 text-slate-600" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-purple-100 p-3 rounded-full">
              <UserCog className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-slate-900">
                Edit User Role
              </DialogTitle>
            </div>
          </div>
          <DialogDescription className="text-slate-600 text-sm">
            Update the role for this user
          </DialogDescription>
        </DialogHeader>

        {user && (
          <div className="space-y-5 py-4">
            {/* User Info */}
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <Avatar className="h-12 w-12 border-2 border-slate-300">
                <AvatarImage src={user.picture} alt={user.name} />
              </Avatar>
              <div>
                <p className="font-semibold text-slate-900">{user.name}</p>
                <p className="text-sm text-slate-600">{user.email}</p>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {user.role}
                </Badge>
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Select New Role
              </label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-full bg-white border-slate-300">
                  <SelectValue placeholder="Choose a role" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  <SelectItem value="user" className="cursor-pointer">
                    User
                  </SelectItem>
                  <SelectItem value="manager" className="cursor-pointer">
                    Manager
                  </SelectItem>
                  <SelectItem value="admin" className="cursor-pointer">
                    Admin
                  </SelectItem>
                  <SelectItem value="superadmin" className="cursor-pointer">
                    SuperAdmin
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </Button>
          <Button
            onClick={onUpdate}
            disabled={!selectedRole || selectedRole === user?.role}
            className="bg-linear-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white"
          >
            Update Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

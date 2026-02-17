import { Trash, UserX, Trash2, AlertCircle } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function DeleteUserDialog({ user, isOpen, onClose, onDelete }) {
  const handleDeleteChoice = (choice) => {
    onDelete(choice, user._id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-0 shadow-2xl max-w-md p-0 gap-0">
        {/* Red Header */}
        <div className="bg-linear-to-r from-red-500 to-red-600 p-6 relative">
          <div className="flex items-start gap-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Trash className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Delete User</h3>
              <p className="text-red-100 text-sm mt-1">
                This action requires confirmation
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        {user && (
          <div className="p-6 space-y-5">
            {/* User Info */}
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <Avatar className="h-12 w-12 border-2 border-slate-300">
                <AvatarImage src={user.picture} alt={user.name} />
              </Avatar>
              <div>
                <p className="font-bold text-slate-900">{user.name}</p>
                <p className="text-sm text-slate-600">{user.email}</p>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {user.role}
                </Badge>
              </div>
            </div>

            {/* Warning Message */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700">
                Please choose how you want to delete this user:
              </p>
            </div>

            {/* Delete Options */}
            <div className="space-y-3">
              {/* Soft Delete */}
              <button
                onClick={() => handleDeleteChoice("soft")}
                className="w-full p-4 rounded-xl bg-linear-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 transition-all text-left group shadow-md hover:shadow-lg"
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="bg-white/30 p-1.5 rounded-lg backdrop-blur-sm">
                    <UserX className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-white text-lg">
                    Soft Delete
                  </span>
                </div>
                <p className="text-white/90 text-sm ml-11">
                  Hide user from system • Can be recovered later
                </p>
              </button>

              {/* Hard Delete */}
              <button
                onClick={() => handleDeleteChoice("hard")}
                className="w-full p-4 rounded-xl bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 transition-all text-left group shadow-md hover:shadow-lg"
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="bg-white/30 p-1.5 rounded-lg backdrop-blur-sm">
                    <Trash2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-white text-lg">
                    Hard Delete
                  </span>
                </div>
                <p className="text-white/90 text-sm ml-11">
                  Permanently remove user • Cannot be recovered
                </p>
              </button>
            </div>

            {/* Cancel Button */}
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 mt-2"
            >
              Cancel
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

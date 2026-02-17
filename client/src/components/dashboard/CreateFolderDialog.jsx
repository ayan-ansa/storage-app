import { useState } from "react";
import { FolderPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createDirectory } from "@/apis/dirFileApi";

export default function CreateFolderDialog({
  open,
  onClose,
  onCreateFolder,
  dirId,
}) {
  const [error, setError] = useState("");
  const [newDirName, setNewDirName] = useState("New Folder");

  const handleCreate = async () => {
    if (!newDirName.trim()) {
      toast.error("Folder name is required");
      return;
    }

    try {
      const res = await createDirectory(dirId, newDirName);
      console.log("Folder created: " + res);
      if (res.success) {
        toast.success(res.message);
        onCreateFolder();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log("Error in creating directory: " + error);
    }
    onClose();
    setError("");
  };

  const handleCancel = () => {
    setNewDirName("New Folder");
    setError("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <FolderPlus className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <DialogTitle>Create New Folder</DialogTitle>
              <DialogDescription>
                Add a new folder to organize your files
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="folder-name">
            Folder name <span className="text-red-400">*</span>
          </Label>
          <Input
            id="folder-name"
            placeholder="e.g., Documents, Projects, Photos"
            value={newDirName}
            onChange={(e) => {
              setNewDirName(e.target.value);
              setError("");
            }}
            onKeyPress={(e) => e.key === "Enter" && handleCreate()}
            className={error ? "border-red-500 focus:ring-red-500" : ""}
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-slate-700 hover:bg-slate-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <FolderPlus className="w-4 h-4 mr-2" />
            Create Folder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

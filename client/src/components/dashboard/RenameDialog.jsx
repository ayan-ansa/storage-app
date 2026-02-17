import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { File, Folder } from "lucide-react";
import { useEffect, useState } from "react";

function RenameDialog({ item, open, onClose, onRename }) {
  if (!open || !item) return null;

  const [error, setError] = useState("");
  const [newName, setNewName] = useState(item ? item.name : "");

  const handleInputChange = (value) => {
    setNewName(value);

    const trimmedValue = value.trim();

    if (!trimmedValue) {
      setError("Name cannot be empty");
      return;
    }
    if (item.type === "file") {
      const currentExtension = item.name.split(".").pop();
      const parts = trimmedValue.split(".");

      // No extension in new name
      if (parts.length < 2) {
        setError(
          `File extension cannot be changed (current: .${currentExtension})`,
        );
        return;
      }

      const newExtension = parts.pop();

      if (currentExtension !== newExtension) {
        setError(
          `File extension cannot be changed (current: .${currentExtension})`,
        );
        return;
      }
      if (trimmedValue === item.name) {
        setError("Name cannot be the same as the current name");
        return;
      }
    }
    setError("");
  };

  const handleRename = async() => {
    await onRename(item, newName);
    onClose();
  };

  useEffect(() => {
    if (item) {
      setError("Name cannot be the same as the current name");
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              {item?.type === "directory" ? (
                <Folder className="w-5 h-5 text-blue-400" />
              ) : (
                <File className="w-5 h-5 text-blue-400" />
              )}
            </div>
            <div>
              <DialogTitle>Rename {item ? item.type : ""}</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="new-name">New Name</Label>
          <Input
            id="new-name"
            placeholder="Enter new name"
            value={newName}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !error && handleRename()}
            className={error ? "border-red-500 focus:ring-red-500" : ""}
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-slate-700 hover:bg-slate-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleRename}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={!newName.trim() || newName === item.name || error}
          >
            Rename
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RenameDialog;

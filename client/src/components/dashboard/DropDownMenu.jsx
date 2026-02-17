import { useState } from "react";
import {
  MoreVertical,
  Info,
  Download,
  Share2,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function DropDownMenu({ item, handleFileAction }) {
  const [open, setOpen] = useState(false);

  const handleAction = (e, action) => {
    e.stopPropagation();
    handleFileAction?.(action, item);
    setOpen(false);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="" onClick={handleClick}>
          <MoreVertical className="w-4 h-4 text-slate-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={(e) => handleAction(e, "details")}>
          <Info className="w-4 h-4" />
          <span>Details</span>
        </DropdownMenuItem>

        {item.type === "file" && (
          <>
            <DropdownMenuItem onClick={(e) => handleAction(e, "download")}>
              <Download className="w-4 h-4" />
              <span>Download</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => handleAction(e, "share")}>
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuItem onClick={(e) => handleAction(e, "rename")}>
          <Edit className="w-4 h-4" />
          <span>Rename</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          variant="destructive"
          onClick={(e) => handleAction(e, "delete")}
        >
          <Trash2 className="w-4 h-4 text-red-600" />
          <span className="text-red-600">Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

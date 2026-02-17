import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export default function AdminHeader({ currentUser, backToText, backToPath }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Link to={backToPath}>
          <Button
            variant="outline"
            className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50 hover:text-white mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to {backToText}
          </Button>
        </Link>

        {/* Current User Info */}
        {currentUser && (
          <div className="flex items-center gap-3 bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 backdrop-blur-sm">
            <Avatar className="h-9 w-9 border-2 border-slate-600">
              <AvatarImage src={currentUser?.picture} alt={currentUser?.name} />
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">
                {currentUser?.name}
              </span>
              <span className="text-xs text-slate-400">
                {currentUser?.email}
              </span>
            </div>
            <Badge
              variant="secondary"
              className="bg-purple-500/20 text-purple-300 border-purple-500/30 ml-2"
            >
              {currentUser?.role}
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}

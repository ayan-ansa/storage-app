import { Home, Star, Clock, Trash2, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Sidebar({ onOpenFolderDialog }) {
  const menuItems = [
    { icon: Home, label: "My Files", active: true },
    { icon: Star, label: "Starred", active: false },
    { icon: Clock, label: "Recent", active: false },
    { icon: Trash2, label: "Trash", active: false },
  ];

  return (
    <aside className="w-64 shrink-0 bg-slate-900/50 border-r border-slate-800 p-6 min-h-screen">
      <div className="space-y-6">
        <Button
          onClick={onOpenFolderDialog}
          className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          <FolderPlus className="w-4 h-4 mr-2" />
          New Folder
        </Button>

        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                item.active
                  ? "bg-blue-600/20 text-blue-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <Card className="bg-linear-to-br from-slate-800 to-slate-900 border-slate-700 p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Storage Used</span>
              <span className="text-slate-200 font-semibold">
                2.4 GB / 5 GB
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-linear-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                style={{ width: "48%" }}
              ></div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-slate-700 text-blue-400 hover:bg-slate-800"
            >
              Upgrade Storage
            </Button>
          </div>
        </Card>
      </div>
    </aside>
  );
}

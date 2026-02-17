import { Users, RefreshCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const filterUserTypes = [
  { value: "all", label: "All Users" },
  { value: "online", label: "Online Users" },
  { value: "active", label: "Active Users" },
  { value: "deleted", label: "Deleted Users" },
  { value: "admin", label: "Admin Users" },
  { value: "regular", label: "Regular Users" },
];

export default function TableHeader({ filter, setFilter, onRefresh }) {
  return (
    <div className="px-6 py-5 border-b border-slate-700">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-400" />
            User List
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            View and manage all users
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={filter} onValueChange={(value) => setFilter(value)}>
            <SelectTrigger className="w-45 bg-slate-900/50 border-slate-700 text-slate-300">
              <SelectValue placeholder="All Users" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              {filterUserTypes.map((filterType) => (
                <SelectItem
                  key={filterType.value}
                  value={filterType.value}
                  className="text-slate-300 focus:bg-slate-800 focus:text-white"
                >
                  {filterType.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="default"
            onClick={onRefresh}
            className="bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
}

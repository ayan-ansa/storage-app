import { Search, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

const Toolbar = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
        <input
          type="text"
          placeholder="Search files and folders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg p-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setViewMode("grid")}
          className={
            viewMode === "grid"
              ? "bg-slate-700 text-blue-400"
              : "text-slate-400"
          }
        >
          <Grid className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setViewMode("list")}
          className={
            viewMode === "list"
              ? "bg-slate-700 text-blue-400"
              : "text-slate-400"
          }
        >
          <List className="w-4 h-4" />
        </Button>
      </div>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        <option value="name">Sort by: Name</option>
        <option value="size">Sort by: Size</option>
        <option value="modified">Sort by: Modified</option>
      </select>
    </div>
  );
};

export default Toolbar;

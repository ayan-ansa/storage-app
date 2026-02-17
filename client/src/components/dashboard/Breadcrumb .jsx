import { ChevronRight, Home } from "lucide-react";

const Breadcrumb = ({ currentPath }) => {
  return (
    <div className="flex items-center gap-2 p-3 rounded text-sm bg-slate-700 text-blue-400">
      <Home className="w-4 h-4" />
      <ChevronRight className="w-4 h-4" />
      <span className="text-slate-300">{currentPath}</span>
    </div>
  );
};

export default Breadcrumb;

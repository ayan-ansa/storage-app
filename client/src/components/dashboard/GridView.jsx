import { Card } from "@/components/ui/card";

import { formatDate, formatFileSize, getFileIcon } from "../../utils/helpers";
import DropDownMenu from "./DropDownMenu";

export default function GridView({ items, handleOpen, handleFileAction }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => {
        return (
          <Card
            key={item._id}
            className="group bg-slate-800 border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer"
            onClick={() => handleOpen(item)}
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-12 h-12 rounded-xl bg-linear-to-br flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {getFileIcon(item)}
                </div>
                <DropDownMenu item={item} handleFileAction={handleFileAction} />
              </div>

              <h3 className="text-slate-200 font-medium mb-1 truncate">
                {item.name}
              </h3>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{formatFileSize(item.size)}</span>
                {/* {item.type === "folder" && <span>{item.items} items</span>} */}
              </div>

              <div className="text-xs text-slate-500 mt-1">
                {formatDate(item.updatedAt)}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

import { Card } from "@/components/ui/card";
import { formatDate, formatFileSize, getFileIcon } from "../../utils/helpers";
import DropDownMenu from "./DropDownMenu";

export default function ListView({ items, handleOpen, handleFileAction }) {
  return (
    <Card className="bg-slate-800 border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-900/50 border-b border-slate-700">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Name
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Size
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Modified
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {items.map((item) => {
              return (
                <tr
                  key={item._id}
                  className="hover:bg-slate-700/50 transition-colors cursor-pointer group"
                  onClick={() => handleOpen(item)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {getFileIcon(item)}
                      <div>
                        <div className="text-slate-200 font-medium">
                          {item.name}
                        </div>
                        {/* {item.type === 'directory' && (
                          <div className="text-xs text-slate-500">
                            {item.items} items
                          </div>
                        )} */}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">
                    {formatFileSize(item.size)}
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">
                    {formatDate(item.updatedAt)}
                  </td>

                  <td className="px-6 py-4">
                    <DropDownMenu item={item} onAction={handleFileAction} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

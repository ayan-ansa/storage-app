import { Cloud, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const { currentUser, fetchUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const fetchedUser = await fetchUser();
      if (!fetchedUser) {
        navigate("/login");
      }
    })();
  }, []);
  return (
    <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Cloud className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              MyStore
            </span>
          </div>

          <div className="flex items-center gap-4">
            {currentUser?.role !== "user" && (
              <Link to="/users" className="text-slate-300 hover:text-blue-400">
                Users
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-300 hover:text-blue-400"
            >
              <Bell className="w-5 h-5" />
            </Button>
            <Link to="/settings" className="text-slate-300 hover:text-blue-400">
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-300 hover:text-blue-400"
              >
                {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout, logoutAll } from "@/apis/authApi";
import { useModal } from "@/contexts/ModalContext";
import { useAuth } from "@/contexts/AuthContext";

const LogoutOptions = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();
  const { showModal, showConfirmModal, closeConfirmModal } = useModal();

  const handleLogout = async () => {
    const res = await logout();
    if (res.success) {
      showModal("Success", "Logged out successfully!", "success");
      setCurrentUser(null);
      setTimeout(() => navigate("/login"), 1500);
    } else {
      showModal("Error", "Logout failed", "error");
    }
  };

  const handleLogoutAll = async () => {
    showConfirmModal(
      "Logout All Devices",
      "Are you sure you want to logout from all devices?",
      async () => {
        const res = await logoutAll();
        if (res.success) {
          showModal("Success", "Logged out from all devices!", "success");
          setCurrentUser(null);
          setTimeout(() => navigate("/login"), 1000);
          closeConfirmModal();
        } else {
          showModal("Error", "Failed to logout all.", "error");
        }
      },
      "warning",
    );
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center gap-2">
          <LogOut className="w-5 h-5 text-orange-400" />
          <CardTitle className="text-slate-100">Logout Options</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                <LogOut className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-200 mb-1">
                  Current Device
                </h3>
                <p className="text-sm text-slate-400">
                  Logout from this device only
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>

          <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                <LogOut className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-200 mb-1">
                  All Devices
                </h3>
                <p className="text-sm text-slate-400">
                  Logout from all devices
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
              onClick={handleLogoutAll}
            >
              Logout All
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LogoutOptions;

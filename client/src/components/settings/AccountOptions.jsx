import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { AlertTriangle, Trash2 } from "lucide-react";
import { deleteAccount, disableAccount } from "@/apis/userApi";
import { useModal } from "@/contexts/ModalContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
const AccountOptions = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();
  const { showModal, showConfirmModal, closeConfirmModal } = useModal();

  const handleDisableAccount = () => {
    showConfirmModal(
      "Disable Account",
      "Are you sure you want to disable your account? This will hide your profile and stop notifications. You can reactivate it later by contacting our support team.",
      async () => {
        const res = await disableAccount();
        if (res.success) {
          showModal(
            "Account Disabled",
            "Your account has been disabled. Contact support@mystore.cloud to reactivate.",
            "success",
          );
          setCurrentUser(null);
          setTimeout(() => navigate("/login"), 1000);
        } else {
          showModal("Error", res.message || "Something went wrong.", "error");
        }
        closeConfirmModal();
      },
      "warning",
    );
  };
  const handleDeleteAccount = () => {
    showConfirmModal(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.",
      async () => {
        const res = await deleteAccount();

        if (res.success) {
          showModal("Account Deleted", "Your account has been deleted.");
          setCurrentUser(null);
          setTimeout(() => navigate("/login"), 1000);
        } else {
          showModal("Error", res.message || "Something went wrong.", "error");
        }
        closeConfirmModal();
      },
      "danger",
    );
  };

  return (
    <>
      <Card className="bg-yellow-500/5 border-yellow-500/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <CardTitle className="text-yellow-400">
              Disable My Account
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-4">
            <div className="flex gap-2 text-sm text-yellow-200">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium mb-1">
                  This action is temporary and can be reversed.
                </p>
                <p className="text-yellow-300/80">
                  Disabling your account will hide your profile and stop all
                  email or app notifications. Your data will be retained
                  securely and can be restored anytime by contacting our support
                  team.
                </p>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
            onClick={handleDisableAccount}
          >
            Disable Account
          </Button>
        </CardContent>
      </Card>

      {/* Delete Account */}
      <Card className="bg-red-500/5 border-red-500/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-red-400" />
            <CardTitle className="text-red-400">Delete My Account</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
            <div className="flex gap-2 text-sm text-red-200">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium mb-1">
                  This action cannot be undone.
                </p>
                <p className="text-red-300/80">
                  Deleting your account will permanently remove all your data,
                  files, and settings. You will lose access to all connected
                  services and this action cannot be reversed.
                </p>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default AccountOptions;

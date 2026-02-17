import { useState } from "react";
import { Lock, Eye, EyeOff} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LogoutOptions from "./LogoutOptions";
import AccountOptions from "./AccountOptions";
const AccountTab = () => {
  const [userPassword, setUserPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-400" />
            <CardTitle className="text-slate-100">
              Set Password for Manual Login
            </CardTitle>
          </div>
          <CardDescription>
            Set a password to enable manual login in addition to your social
            login
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-100">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={userPassword.password}
                onChange={(e) =>
                  setUserPassword((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="text-slate-100"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-slate-100">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={userPassword.confirmPassword}
                onChange={(e) =>
                  setUserPassword((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                className="text-slate-100"
                placeholder="Confirm password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700">
            Set Password
          </Button>
        </CardContent>
      </Card>

      {/* Logout Options */}
      <LogoutOptions />

      {/* Disable Account */}
      <AccountOptions />
    </div>
  );
};

export default AccountTab;

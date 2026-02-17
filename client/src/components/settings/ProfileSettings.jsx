import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { User, Upload } from "lucide-react";

const ProfileTab = ({ currentUser }) => {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-400" />
            <CardTitle className="text-slate-100">Profile Settings</CardTitle>
          </div>
          <CardDescription>
            Update your personal information and profile picture
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture */}
          <div>
            <Label className="mb-3 block text-slate-100">Profile Picture</Label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <img
                  src={currentUser?.picture}
                  alt={currentUser?.name}
                  className="w-20 h-20 rounded-full"
                />
              </div>
              <div className="flex-1">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New Picture
                </Button>
                <p className="text-sm text-slate-400 mt-2">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullname " className="text-slate-100">
              Full Name
            </Label>
            <Input
              id="fullname"
              placeholder="John Doe"
              className="text-slate-100"
              defaultValue={currentUser?.name || "John Doe"}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-100">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              className="text-slate-100"
              defaultValue={currentUser?.email || "john@example.com"}
              disabled
            />
            <p className="text-xs text-slate-500">
              Email cannot be changed once set.
            </p>
          </div>

          {/* Action */}
          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Update Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;

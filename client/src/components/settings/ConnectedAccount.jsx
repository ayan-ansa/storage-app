import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react";

const ConnectedAccount = () => {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-slate-100">Connected Account</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
              <Github className="w-5 h-5 text-slate-300" />
            </div>
            <div>
              <div className="font-medium text-slate-200">GitHub</div>
              <div className="text-sm text-slate-400">john_doe_developer</div>
            </div>
          </div>
          <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-medium">
            Connected
          </div>
        </div>
        <p className="text-sm text-slate-400 mt-3">
          Only one social account can be connected at a time. This account is
          used for authentication.
        </p>
      </CardContent>
    </Card>
  );
};

export default ConnectedAccount;

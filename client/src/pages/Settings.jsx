import { useState } from "react";
import { User, Shield, ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import ProfileTab from "@/components/settings/ProfileSettings";
import AccountTab from "@/components/settings/AccountSettings";

export default function Settings() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "account", label: "Account", icon: Shield },
  ];

  return (
    <main className="h-full overflow-y-auto p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link to="/dashboard">
            <Button className="text-slate-400 bg-blue-600/20 hover:text-slate-200 mb-4">
              <ChevronLeft />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-slate-100">Settings</h1>
          <p className="text-slate-400 mt-1">
            Manage your profile and account preferences
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-800">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors relative ${
                activeTab === tab.id
                  ? "text-blue-400"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
              )}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && <ProfileTab currentUser={currentUser} />}

        {/* Account Tab */}
        {activeTab === "account" && <AccountTab />}
      </div>
    </main>
  );
}

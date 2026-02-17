import { useState, useEffect } from "react";
import { Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-black/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110">
              <Cloud className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              MyStore
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-slate-300 hover:text-blue-400 transition-colors font-medium"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-slate-300 hover:text-blue-400 transition-colors font-medium"
            >
              How it works
            </a>
            <a
              href="#pricing"
              className="text-slate-300 hover:text-blue-400 transition-colors font-medium"
            >
              Pricing
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link to={"/login"}>
              <Button
                variant="ghost"
                className="text-slate-300 cursor-pointer hover:text-blue-400"
              >
                Sign in
              </Button>
            </Link>
            <Link to={"/register"}>
              <Button className="bg-linear-to-r cursor-pointer  from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

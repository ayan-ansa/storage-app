import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { login } from "@/apis/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import SocialButtons from "@/components/auth/SocialButtons";

export default function Login() {
  const { fetchUser } = useAuth();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const data = await login(formData);
      if (!data.success) {
        // If there's an error, set the serverError message
        toast.error(data.message);
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const user = await fetchUser();
      
      if (user) {
        navigate("/dashboard");
      }
    })();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1729] p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,127,255,0.15)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(79,127,255,0.08)_0%,transparent_50%)] pointer-events-none" />

      <Card className="w-full max-w-md bg-[#1e293b] border border-[#2d3a52] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative z-10 animate-[slideUp_0.5s_cubic-bezier(0.16,1,0.3,1)]">
        <CardHeader className="pt-12 px-8 pb-6 text-center space-y-4">
          <CardTitle className="text-4xl font-extrabold text-white tracking-tight">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-base text-[#94a3b8]">
            Please sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 animate-[fadeIn_0.4s_cubic-bezier(0.16,1,0.3,1)_backwards] [animation-delay:0.05s]">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-white"
              >
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-3 text-base bg-[#1a2235] border ${
                  errors.email ? "border-red-500" : "border-[#2d3a52]"
                } rounded-lg text-white placeholder:text-[#64748b] focus:border-[#4F7FFF] focus:bg-[#1e293b] focus:ring-[3px] focus:ring-[#4F7FFF]/10 transition-all outline-none h-10`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-[13px] text-red-500 flex items-center gap-1.5 mt-2">
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2 animate-[fadeIn_0.4s_cubic-bezier(0.16,1,0.3,1)_backwards] [animation-delay:0.1s]">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-sm font-semibold text-white"
                >
                  Password
                </Label>
                <a
                  href="#"
                  className="text-sm text-[#4F7FFF] hover:text-[#6B95FF] font-medium transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-3 py-3 text-base bg-[#1a2235] border ${
                  errors.password ? "border-red-500" : "border-[#2d3a52]"
                } rounded-lg text-white placeholder:text-[#64748b] focus:border-[#4F7FFF] focus:bg-[#1e293b] focus:ring-[3px] focus:ring-[#4F7FFF]/10 transition-all outline-none h-10`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-[13px] text-red-500 flex items-center gap-1.5 mt-2">
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 px-6 py-3 text-base font-semibold bg-[#4F7FFF] hover:bg-[#6B95FF] text-white rounded-lg active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none relative overflow-hidden group"
            >
              {isLoading && (
                <svg className="inline-block w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              Sign In
            </Button>
          </form>

          <div className="relative my-6 animate-[fadeIn_0.4s_cubic-bezier(0.16,1,0.3,1)_backwards] [animation-delay:0.3s]">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#2d3a52]" />
            </div>
            <div className="relative flex justify-center text-[13px]">
              <span className="px-4 text-[#64748b] bg-[#1e293b]">
                Or continue with
              </span>
            </div>
          </div>

          <SocialButtons />
        </CardContent>

        <CardFooter className="px-8 pb-8 pt-6 text-center border-t border-[#2d3a52]">
          <p className="text-[15px] text-[#94a3b8] w-full">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-[#4F7FFF] font-semibold hover:text-[#6B95FF] hover:underline transition-colors"
            >
              Get Started
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

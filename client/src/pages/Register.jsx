import { useState } from "react";
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
import {  register } from "@/apis/authApi";
import SocialButtons from "@/components/auth/SocialButtons";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSending, setIsOtpSending] = useState(false);
  const navigate = useNavigate();

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

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

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
      const data = await register(formData);
      if (!data.success) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        navigate("/login");
        setFormData({
          email: "",
          password: "",
          name: "",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };



  // Send OTP handler
  const handleSendOtp = async () => {
    const { email } = formData;
    if (!email) {
      setOtpError("Please enter your email first.");
      return;
    }

    try {
      setIsSending(true);
      const res = await fetch(`${BASE_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        setCountdown(60);
        setOtpError("");
      } else {
        setOtpError(data.error || "Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      setOtpError("Something went wrong sending OTP.");
    } finally {
      setIsSending(false);
    }
  };

  // Verify OTP handler
  // const handleVerifyOtp = async () => {
  //   const { email } = formData;
  //   if (!otp) {
  //     setOtpError("Please enter OTP.");
  //     return;
  //   }

  //   try {
  //     setIsVerifying(true);
  //     const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, otp }),
  //     });
  //     const data = await res.json();

  //     if (res.ok) {
  //       setOtpVerified(true);
  //       setOtpError("");
  //     } else {
  //       setOtpError(data.error || "Invalid or expired OTP.");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setOtpError("Something went wrong verifying OTP.");
  //   } finally {
  //     setIsVerifying(false);
  //   }
  // };


// Countdown timer for resend
  // useEffect(() => {
  //   if (countdown <= 0) return;
  //   const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
  //   return () => clearTimeout(timer);
  // }, [countdown]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1729] p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,127,255,0.15)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(79,127,255,0.08)_0%,transparent_50%)] pointer-events-none" />

      <Card className="w-full max-w-md bg-[#1e293b] border border-[#2d3a52] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative z-10 animate-[slideUp_0.5s_cubic-bezier(0.16,1,0.3,1)]">
        <CardHeader className="pt-12 px-8 pb-6 text-center space-y-4">
          <CardTitle className="text-4xl font-extrabold text-white tracking-tight">
            Create Account
          </CardTitle>
          <CardDescription className="text-base text-[#94a3b8]">
            Enter your details to get started
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className=" animate-[fadeIn_0.4s_cubic-bezier(0.16,1,0.3,1)_backwards] [animation-delay:0.05s]">
              <Label
                htmlFor="name"
                className="text-sm font-semibold text-white"
              >
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-3 text-base bg-[#1a2235] border ${
                  errors.name ? "border-red-500" : "border-[#2d3a52]"
                } rounded-lg text-white placeholder:text-[#64748b] focus:border-[#4F7FFF] focus:bg-[#1e293b] focus:ring-[3px] focus:ring-[#4F7FFF]/10 transition-all outline-none h-10`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-[13px] text-red-500 flex items-center gap-1.5 mt-2">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="animate-[fadeIn_0.4s_cubic-bezier(0.16,1,0.3,1)_backwards] [animation-delay:0.1s]">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-white"
              >
                Email Address
              </Label>
              <div className="flex gap-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`flex-1 px-3 py-3 text-base bg-[#1a2235] border ${
                    errors.email ? "border-red-500" : "border-[#2d3a52]"
                  } rounded-lg text-white placeholder:text-[#64748b] focus:border-[#4F7FFF] focus:bg-[#1e293b] focus:ring-[3px] focus:ring-[#4F7FFF]/10 transition-all outline-none h-10`}
                  placeholder="you@example.com"
                />
                <Button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={isOtpSending || otpSent}
                  className="px-3 h-10 text-sm font-semibold bg-[#1a2235] hover:bg-[#4F7FFF] border border-[#2d3a52] hover:border-[#4F7FFF] text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isOtpSending ? (
                    <svg className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : otpSent ? (
                    "OTP Sent"
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              </div>
              {errors.email && (
                <p className="text-[13px] text-red-500 flex items-center gap-1.5 mt-2">
                  {errors.email}
                </p>
              )}
              {otpSent && !errors.email && (
                <p className="text-[13px] text-[#10b981] flex items-center gap-1.5 mt-2">
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  OTP sent successfully! Check your email.
                </p>
              )}
            </div>

            <div className="animate-[fadeIn_0.4s_cubic-bezier(0.16,1,0.3,1)_backwards] [animation-delay:0.15s]">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-white"
              >
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-3 py-3 text-base bg-[#1a2235] border ${
                  errors.password ? "border-red-500" : "border-[#2d3a52]"
                } rounded-lg text-white placeholder:text-[#64748b] focus:border-[#4F7FFF] focus:bg-[#1e293b] focus:ring-[#4F7FFF]/10 transition-all outline-none h-10`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-[13px] text-red-500 flex items-center gap-1.5 mt-2">
                  {errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 px-6 py-3 text-base font-semibold bg-[#4F7FFF] hover:bg-[#6B95FF] text-white rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(79,127,255,0.3)] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              {isLoading && (
                <svg className="inline-block w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              Create Account
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

          <SocialButtons/>
        </CardContent>

        <CardFooter className="px-8 pb-8 pt-6 text-center border-t border-[#2d3a52]">
          <p className="text-[15px] text-[#94a3b8] w-full">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#4F7FFF] font-semibold hover:text-[#6B95FF]"
            >
              Sign In
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

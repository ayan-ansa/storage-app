import { GoogleLogin } from "@react-oauth/google";
import { BsGithub } from "react-icons/bs";
import { googleAuth } from "@/apis/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const SocialButtons = () => {
  const navigate = useNavigate();

  const handleLoginWithGoogle = async (idToken) => {
    try {
      const data = await googleAuth(idToken);
      if (!data.success) {
        toast.error(data.message);
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3.5 animate-[fadeIn_0.4s_cubic-bezier(0.16,1,0.3,1)_backwards] [animation-delay:0.35s]">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          handleLoginWithGoogle(credentialResponse.credential);
        }}
        theme="outline"
        text="continue_with"
        shape="rectangular"
        logo_alignment="center"
        size="medium"
        onError={() => {
          console.log("Login Failed");
        }}
        // useOneTap
      />
      <button
        type="button"
        onClick={() =>
          (window.location.href = "http://localhost:5000/api/auth/github")
        }
        className="flex items-center justify-center gap-2.5 px-3 py-3 text-[15px] font-medium bg-[#1a2235] hover:bg-[#1e293b] border border-[#2d3a52] hover:border-[#334155] text-white rounded-lg transition-all hover:-translate-y-0.5"
      >
        <BsGithub size={18} />
        GitHub
      </button>
    </div>
  );
};

export default SocialButtons;

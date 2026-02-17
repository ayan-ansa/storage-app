import { getUser } from "@/apis/userApi";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUser = async () => {
    try {
      const data = await getUser();
      if (!data.success) {
        toast.error(data.message);
        return null;
      } else {
        setCurrentUser(data.user);
        return data.user;
      }
    } catch (err) {
      console.error("Error fetching user info:", err);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };

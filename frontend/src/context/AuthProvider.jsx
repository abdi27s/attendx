import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 login → only sets cookie
  const login = async (data) => {
    await api.post("/auth/login", data);

    // 🔄 always fetch real user after login
    const res = await api.get("/auth/profile");
    setUser(res.data);
  };

  // 🚪 logout
  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    toast.success("Logout successful");
  };

  // 🔄 restore session on refresh
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get("/auth/profile");
        setUser(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

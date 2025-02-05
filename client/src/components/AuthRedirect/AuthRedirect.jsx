import useAuthStore from "@/store/authStore";
import { Navigate } from "react-router-dom";

const AuthRedirect = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

export default AuthRedirect;

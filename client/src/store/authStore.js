import axiosInstance from "@/services/api";
import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (formData) => {
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      set({ user: res.data.employee, isAuthenticated: true });
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  },
  signup: async (formData) => {
    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      console.log(res);
      set({ user: res.data.employee, isAuthenticated: true });
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  },
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      console.log(res);
      set({ user: res.data.employee, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
    }
  },

  logout: async () => {
    await axiosInstance.post("/auth/logout");
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;

import axiosInstance from "@/services/api";
import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (formData) => {
    try {
      await axiosInstance.post("/auth/login", formData);
      await useAuthStore.getState().checkAuth();
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  },

  signup: async (formData) => {
    try {
      await axiosInstance.post("/auth/signup", formData);
      await useAuthStore.getState().checkAuth();
      return true;
    } catch (error) {
      console.error("Signup failed:", error);
      return false;
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      set({ user: res.data.user, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
}));

export default useAuthStore;

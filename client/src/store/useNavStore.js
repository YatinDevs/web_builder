import { create } from "zustand";
import axiosInstance from "@/services/api";

const useNavStore = create((set) => ({
  navSections: [],
  loading: false,
  error: null,

  fetchNavSection: async (websiteId) => {
    try {
      const response = await axiosInstance.get(
        `/template/navSection/${websiteId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching navigation section:", error);
      return null;
    }
  },

  fetchNavSectionwithWebId: async (websiteId) => {
    try {
      const response = await axiosInstance.get(
        `/template/navSection/web-id/${websiteId}`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching navigation section:", error);
      return null;
    }
  },

  createNavSection: async (newNavSection) => {
    try {
      const response = await axiosInstance.post(
        "/template/navSection",
        newNavSection
      );
      set((state) => ({ navSections: [...state.navSections, response.data] }));
      return response.data;
    } catch (error) {
      console.error(
        "Error creating nav section:",
        error.response?.data || error.message
      );
    }
  },

  updateNavSection: async (id, updatedData) => {
    try {
      const response = await axiosInstance.put(
        `/template/navSection/${id}`,
        updatedData
      );
      set((state) => ({
        navSections: state.navSections.map((item) =>
          item.id === id ? response.data : item
        ),
      }));
    } catch (error) {
      console.error(
        "Error updating nav section:",
        error.response?.data || error.message
      );
    }
  },

  deleteNavSection: async (id) => {
    try {
      await axiosInstance.delete(`/template/navSection/${id}`);
      set((state) => ({
        navSections: state.navSections.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error(
        "Error deleting nav section:",
        error.response?.data || error.message
      );
    }
  },
}));

export default useNavStore;

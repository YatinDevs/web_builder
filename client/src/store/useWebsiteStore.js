import { create } from "zustand";
import axiosInstance from "@/services/api";

const useWebsiteStore = create((set) => ({
  websiteId: null,
  subdomain: "",
  templateId: null,
  status: "",

  createWebsite: async ({ userId, templateId, subdomain }) => {
    try {
      const response = await axiosInstance.post("/websites", {
        user_id: userId,
        template_id: templateId,
        subdomain,
      });

      const {
        website_id,
        subdomain: savedSubdomain,
        template_id,
        status,
      } = response.data.website;

      set({
        websiteId: website_id,
        subdomain: savedSubdomain,
        templateId,
        status,
      });

      return { success: true, websiteId: website_id }; // Return success and websiteId
    } catch (error) {
      console.error("Error creating website:", error);
      return {
        success: false,
        message: "Failed to create website. Try a different subdomain.",
      };
    }
  },

  fetchWebsiteDetails: async (websiteId) => {
    try {
      const response = await axiosInstance.get(`/websites/${websiteId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching navigation section:", error);
      return null;
    }
  },
}));

export default useWebsiteStore;

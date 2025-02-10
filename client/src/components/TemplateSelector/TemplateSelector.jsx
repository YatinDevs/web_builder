import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "@/store/authStore";
import {
  Template1Desktop,
  Template1Mobile,
  Template2Desktop,
  Template2Mobile,
} from "@/assets";

const TemplateSelector = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [subdomain, setSubdomain] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!selectedTemplate || !subdomain) {
      setError("Please select a template and enter a subdomain.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8088/api/v1/websites",
        {
          user_id: user.id,
          template_id: selectedTemplate,
          subdomain: subdomain,
        }
      );
      console.log(response);
      if (response.data.success) {
        navigate("/customize", {
          state: {
            website: response.data.website,
          },
        });
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Failed to create website. Try a different subdomain.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center">
        Step 1: Choose a Template
      </h2>

      <div className="flex flex-col space-x-4">
        {/* Template 1 */}
        <div
          className={`border p-4 cursor-pointer flex flex-col items-center ${
            selectedTemplate === "1" ? "border-blue-500" : ""
          }`}
          onClick={() => setSelectedTemplate("1")}
        >
          <h3 className="font-semibold">Desktop View Template 1</h3>
          <img src={Template1Desktop} className="w-400 h-50" />
          <h3 className="font-semibold mt-2">Mobile View Template 1</h3>
          <img src={Template1Mobile} className="w-60 h-100" />
        </div>

        {/* Template 2 */}
        <div
          className={`border p-4 cursor-pointer flex flex-col items-center ${
            selectedTemplate === "2" ? "border-blue-500" : ""
          }`}
          onClick={() => setSelectedTemplate("2")}
        >
          <h3 className="font-semibold">Desktop View Template 2</h3>
          <img src={Template2Desktop} className="w-400 h-50" />
          <h3 className="font-semibold mt-2">Mobile View Template 2</h3>
          <img src={Template2Mobile} className="w-60 h-100" />
        </div>
      </div>

      {selectedTemplate && (
        <div className="mt-4">
          <label className="block font-semibold">Enter Subdomain:</label>
          <input
            type="text"
            value={subdomain}
            onChange={(e) => setSubdomain(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="yourbusiness"
          />
        </div>
      )}

      {selectedTemplate && (
        <button
          onClick={handleSave}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save and Continue
        </button>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default TemplateSelector;

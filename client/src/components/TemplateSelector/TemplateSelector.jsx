import React, { useState } from "react";
import data1 from "@/templates/Template1/constants/template";
import data2 from "@/templates/Template2/constants/template";
import data3 from "@/templates/Template3/constants/template";
import Template1 from "@/templates/Template1";
import Template2 from "@/templates/Template2";
import {
  Template1Desktop,
  Template1Mobile,
  Template2Desktop,
  Template2Mobile,
} from "@/assets";
import axios from "axios";
import useAuthStore from "@/store/authStore";

const TemplateSelector = ({ userId }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [subdomain, setSubdomain] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { user } = useAuthStore();
  console.log(user, selectedTemplate, subdomain);
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
      if (response.success) {
        setSuccessMessage("Template selected successfully!");
        setError("");
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error("Error creating website:", error);
      setError("Failed to create website. Try a different subdomain.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center p-2 m-2">
        Step 1: Choose a Template
      </h2>

      <div className="flex flex-col space-x-4">
        {/* Template 1 Preview */}
        <div
          className={`border p-4 cursor-pointer flex justify-center items-center flex-col ${
            selectedTemplate === "1" ? "border-blue-500" : ""
          }`}
          onClick={() => setSelectedTemplate("1")}
        >
          <h3 className="font-semibold uppercase text-center">
            Desktop View Template 1
          </h3>
          <img src={Template1Desktop} className="w-400 h-50" />
          <h3 className="font-semibold uppercase text-center m-2">
            Mobile View Template 1
          </h3>
          <img src={Template1Mobile} className="w-60 h-100 " />
        </div>

        {/* Template 2 Preview */}
        <div
          className={`border p-4 cursor-pointer flex justify-center items-center flex-col ${
            selectedTemplate === "2" ? "border-blue-500" : ""
          }`}
          onClick={() => setSelectedTemplate("2")}
        >
          <h3 className="font-semibold uppercase text-center">
            Desktop View Template 2
          </h3>
          <img src={Template2Desktop} className="w-400 h-50" />
          <h3 className="font-semibold uppercase text-center m-2">
            Mobile View Template 2
          </h3>
          <img src={Template2Mobile} className="w-60 h-100 " />
        </div>
      </div>

      {/* Subdomain Input */}
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

      {/* Save Button */}
      {selectedTemplate && (
        <button
          onClick={handleSave}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Template and SubDomain
        </button>
      )}

      {/* Live Preview */}
      <div className="mt-6 border shadow-2xs p-2 rounded-2xl">
        <h2 className="text-xl font-semibold">Live Preview</h2>
        {selectedTemplate === "1" ? (
          <Template1 navbarData={data1.navbar} />
        ) : selectedTemplate === "2" ? (
          <Template2 navbarData={data2.navbar} />
        ) : null}
      </div>

      {/* Success/Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {successMessage && (
        <p className="text-green-500 mt-4">{successMessage}</p>
      )}
    </div>
  );
};

export default TemplateSelector;

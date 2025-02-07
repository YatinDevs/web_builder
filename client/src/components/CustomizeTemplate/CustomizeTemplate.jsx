import Template1 from "@/templates/Template1";
import Template2 from "@/templates/Template2";
import { useState } from "react";

const CustomizeTemplate = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("Template1");
  const [formData, setFormData] = useState({
    navbar: {
      titleUserName: "CA. YOGESH BHALCHANDRA TATAR",
      caLogo: "https://www.ca-yogeshtatar.com/images/logo.png",
      caContactNo1: "1234567890",
      caContactNo2: "1234567890",
      caEmailid: "info@ca-abcdef.com",
      navItems: [
        { label: "home", link: "home" },
        { label: "team", link: "team" },
        { label: "services", link: "services" },
        { label: "acts", link: "acts" },
        { label: "forms", link: "forms" },
        { label: "rules", link: "rules" },
        { label: "news", link: "news" },
        { label: "utilies", link: "utilies" },
        { label: "imp. dates", link: "imp. dates" },
        { label: "links", link: "links" },
        { label: "contact Us", link: "contact us" },
      ],
    },
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold">Customize Your Template</h2>

      {/* Select Template */}
      <div className="space-x-4">
        <button
          onClick={() => setSelectedTemplate("Template1")}
          className={`p-2 ${
            selectedTemplate === "Template1" ? "bg-blue-700" : "bg-blue-500"
          } text-white`}
        >
          Select Template 1
        </button>
        <button
          onClick={() => setSelectedTemplate("Template2")}
          className={`p-2 ${
            selectedTemplate === "Template2" ? "bg-blue-700" : "bg-blue-500"
          } text-white`}
        >
          Select Template 2
        </button>
      </div>

      {/* Customization Form */}
      <form className="space-y-4 mt-4">
        <input
          type="text"
          name="titleUserName"
          value={formData.navbar.titleUserName}
          onChange={handleChange}
          placeholder="Enter Name"
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="caContactNo1"
          value={formData.navbar.caContactNo1}
          onChange={handleChange}
          placeholder="Enter Contact Number"
          className="border p-2 w-full"
        />
        <input
          type="email"
          name="caEmailid"
          value={formData.navbar.caEmailid}
          onChange={handleChange}
          placeholder="Enter Email"
          className="border p-2 w-full"
        />
      </form>

      {/* Live Preview */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Live Preview</h2>
        {selectedTemplate === "Template1" ? (
          <Template1 data={formData} />
        ) : (
          <Template2 data={{ ...formData }} />
        )}
      </div>
    </div>
  );
};

export default CustomizeTemplate;

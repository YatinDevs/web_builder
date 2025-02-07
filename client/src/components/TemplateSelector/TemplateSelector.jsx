import { useState } from "react";

import data1 from "@/templates/Template1/constants/template";
import data2 from "@/templates/Template2/constants/template";
import data3 from "@/templates/Template3/constants/template";
import Template1 from "@/templates/Template1";
import Template2 from "@/templates/Template2";
const TemplateSelector = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("Template1");

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold">Choose a Template</h2>

      <div className="flex flex-col  space-x-4">
        {/* Template 1 Preview */}
        <div
          className="border p-4 cursor-pointer"
          onClick={() => setSelectedTemplate("Template1")}
        >
          <h3 className="font-semibold">Template 1</h3>
          <Template1 navbarData={data1.navbar} />
        </div>

        {/* Template 2 Preview */}
        <div
          className="border p-4 cursor-pointer"
          onClick={() => setSelectedTemplate("Template2")}
        >
          <h3 className="font-semibold">Template 2</h3>
          <Template2 navbarData={data2.navbar} />
        </div>
      </div>

      {/* Live Preview of Selected Template */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Live Preview</h2>
        {selectedTemplate === "Template1" ? (
          <Template1 navbarData={data1.navbar} />
        ) : (
          <Template2 navbarData={data2.navbar} />
        )}
      </div>
    </div>
  );
};

export default TemplateSelector;

import FetchNavSection from "@/pages/NavSection/FetchNavData";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CustomizeTemplate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { website, subdomain } = location.state || {};

  return (
    <div>
      <h2 className="text-2xl font-bold text-center p-4">
        Step 2: Customize Your Website
      </h2>
      <FetchNavSection
        website={website}
        selectedTemplate={website?.template_id}
        subdomain_r={website?.subdomain}
        website_id={website?.website_id}
      />
    </div>
  );
};

export default CustomizeTemplate;

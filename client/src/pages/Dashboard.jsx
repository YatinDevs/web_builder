import CustomizeTemplate from "@/components/CustomizeTemplate/CustomizeTemplate";
import TemplateSelector from "@/components/TemplateSelector/TemplateSelector";
import useAuthStore from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import FetchNavSection from "./NavSection/FetchNavData";
import { useState } from "react";
import useWebsiteStore from "@/store/useWebsiteStore";

const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const { websiteId, subdomain, templateId } = useWebsiteStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  const [selectedTemplate, setSelectedTemplate] = useState(templateId);
  const [website_id, setWebsiteId] = useState(websiteId);
  const [subdomain_r, setSubdomain] = useState(subdomain);

  return (
    <div>
      <div className="flex justify-around items-center m-2">
        <h1 className="text-2xl">Welcome {user?.username}</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div>
        <TemplateSelector setSelectedTemplate={setSelectedTemplate} />
      </div>
      <div className="mb-100">
        <FetchNavSection
          selectedTemplate={selectedTemplate}
          subdomain_r={subdomain_r}
          website_id={website_id}
        />
      </div>
      {/* <CustomizeTemplate /> */}
    </div>
  );
};

export default Dashboard;

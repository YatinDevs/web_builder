import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import TemplateSelector from "@/components/TemplateSelector/TemplateSelector";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/rich_logo.png";
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";
import { RiLinkedinBoxLine } from "react-icons/ri";

const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <div>
      <nav className=" top-0 z-50 py-3 backdrop-blur-lg border-b bg-[#274584] border-[#274584]">
        <div className="container px-4 mx-auto relative lg:text-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center flex-shrink-0">
              <span className="text-lg uppercase  text-[#fff] font-normal tracking-tight">
                Welcome To {user?.username}
              </span>
            </div>

            <div className="hidden lg:flex justify-center space-x-12 items-center">
              {" "}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <TemplateSelector />
    </div>
  );
};

export default Dashboard;

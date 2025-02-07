import { Menu, X } from "lucide-react";
import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const NavbarTop = ({ navbarData }) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  // console.log(navbarData?.titleUserName);
  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="w-full top-0 z-50 py-3 backdrop-blur-lg border-b bg-[#274584] border-[#274584]">
      <div className="container px-4 mx-auto relative lg:text-sm flex justify-around items-center">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <span className="text-xs  md:text-lg uppercase  text-[#fff] font-normal tracking-tight">
              Welcome To {navbarData?.titleUserName}
            </span>
          </div>
        </div>{" "}
        <div className="hidden md:flex items-center justify-center gap-4">
          <span className="w-8 h-8 rounded-full bg-black flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-[0_0_10px] hover:shadow-blue-500 hover:text-blue-500 text-white">
            <FaFacebookF />
          </span>
          <span className="w-8 h-8 rounded-full bg-black flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-[0_0_10px] hover:shadow-blue-500 hover:text-blue-500 text-white">
            <FaInstagram />
          </span>
          <span className="w-8 h-8 rounded-full bg-black flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-[0_0_10px] hover:shadow-blue-500 hover:text-blue-500 text-white">
            <FaTwitter />
          </span>
          <span className="w-8 h-8 rounded-full bg-black flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-[0_0_10px] hover:shadow-blue-500 hover:text-blue-500 text-white">
            <FaLinkedin />
          </span>
        </div>
      </div>
    </nav>
  );
};

export default NavbarTop;

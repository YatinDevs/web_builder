import { Menu, X } from "lucide-react";
import { useState } from "react";
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";
import { RiLinkedinBoxLine } from "react-icons/ri";

const NavbarMenu = ({ navbarData }) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="w-full top-0 z-50 py-3 shadow-2xl backdrop-blur-lg border-b bg-[#ffffff] border-[#ffffff]">
      <div className="container px-10 mx-auto relative lg:text-sm">
        <div className="flex justify-around items-center  ">
          <div className="flex items-center flex-shrink-0  w-full pb-4">
            <span className="text-xs md:text-md font-semibold uppercase tracking-tight text-[#274584]">
              Menu
            </span>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end  text-[#00afe9]">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <ul className="w-full hidden lg:flex ml-14 space-x-6 uppercase font-semibold text-[#274584] text-xs">
          {navbarData?.navItems?.map((item, index) => (
            <li key={index}>
              <a href={item.link}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
      {mobileDrawerOpen && (
        <div className="w-full fixed right-0 z-20 bg-[#ffffff]  border-[#ffffff]  md:px-12 py-2 flex text-xs md:text-md flex-col justify-center items-center lg:hidden">
          <ul className="w-full px-14">
            {navbarData?.navItems?.map((item, index) => (
              <li
                key={index}
                className="py-4 border-t w-full text-md text-[#274584] uppercase font-semibold border-b-gray-200"
              >
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavbarMenu;

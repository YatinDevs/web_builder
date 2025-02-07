import React from "react";
import { IoCallOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";

function NavbarInfo({ navbarData }) {
  return (
    <div className=" w-full bg-[#f4f4f4] flex flex-col gap-3 justify-center items-start text-xs md:flex-row md:justify-around md:items-center p-2 py-4">
      <img src={navbarData?.caLogo} className="" alt="calogo" />

      <div className="flex space-x-4">
        <div className="text-[#00afe9] text-lg md:text-2xl border border-[#00afe9] rounded-full flex justify-center items-center p-4 cursor-pointer transition-all duration-300 hover:shadow-[0_0_10px] hover:shadow-blue-500 hover:text-blue-500">
          <IoCallOutline />
        </div>
        <div>
          <p className="text-[#274584] text-md md:text-lg"> Call Us On</p>
          <p className="text-gray-700">
            {navbarData?.caContactNo2} | {navbarData?.caContactNo1}
          </p>
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="text-[#00afe9] text-lg md:text-2xl border border-[#00afe9] rounded-full flex justify-center items-center p-4 cursor-pointer transition-all duration-300 hover:shadow-[0_0_10px] hover:shadow-blue-500 hover:text-blue-500">
          <TfiEmail />
        </div>
        <div>
          <p className="text-[#274584] text-md md:text-lg"> Leave a message</p>{" "}
          <p className="text-gray-700">{navbarData?.caEmailid}</p>
        </div>
      </div>
    </div>
  );
}

export default NavbarInfo;

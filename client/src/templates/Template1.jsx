import React from "react";
import NavbarTop from "./Template1/Navbar/NavbarTop";
import NavbarInfo from "./Template1/Navbar/NavbarInfo";
import NavbarMenu from "./Template1/Navbar/NavbarMenu";
import data from "../templates/Template1/constants/template";
function Template1({ navbarData, templateIss }) {
  console.log(navbarData, templateIss);
  return (
    <>
      <NavbarTop navbarData={navbarData?.data} />
      <NavbarInfo navbarData={navbarData?.data} />
      <NavbarMenu navbarData={navbarData?.data} />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <h1 className="text-3xl font-bold underline">
          Welcome to Template {templateIss}
        </h1>
      </div>
    </>
  );
}

export default Template1;

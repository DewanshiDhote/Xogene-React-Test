import React from "react";
import logo from "./Xogene_logo.png";

const Header = () => {
  return (
    <header className="bg-black p-4 flex items-center justify-between shadow-md">
      <img src={logo} alt="Logo" className="w-25 h-12" />
      <h1 className="text-purple-500 text-2xl font-semibold">Search Drugs</h1>
      <div className="w-12 h-12"></div>
    </header>
  );
};

export default Header;

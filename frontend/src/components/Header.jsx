import React from "react";

const Header = () => {
  return (
    <div className="flex items-center justify-center bg-green-500 p-5 text-white font-sans text-3xl shadow-xl">
      <img
        src="../3337536.webp"
        alt="Diabetes Icon"
        className="w-16 h-16 mr-4"
      />
      <span className="text-white">Diabetes Prediction</span>
    </div>
  );
};

export default Header;

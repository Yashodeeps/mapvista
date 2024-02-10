import React from "react";

const title = (
  <h1 className="text-blue-900 text-2xl font-bold">
    Map<span className="text-orange-700">Vista</span>
  </h1>
);

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 p-6  shadow-lg bg-white">
      {title}
    </div>
  );
};

export default Navbar;

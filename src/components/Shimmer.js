import React from "react";
import { Audio } from "react-loader-spinner";

const Shimmer = () => {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
      <h1 className="text-xl font-semibold text-green-600">
        Few secs till we cook up your Project MAP....
      </h1>
    </div>
  );
};

export default Shimmer;

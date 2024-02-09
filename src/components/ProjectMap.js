import React from "react";
import { useSelector } from "react-redux";

const ProjectMap = () => {
  console.log("reached projectmap");
  const projectmap = useSelector((store) => store.map);
  console.log(projectmap);
  // Check if projectmap is null
  if (!projectmap) {
    return <div>Loading...</div>; // or any other appropriate UI for loading state
  }
  return (
    <div>
      {Object.entries(projectmap).map(([heading, checkpoints]) => (
        <div key={heading}>
          <h2 className="text-2xl m-4">{heading}</h2>
          <ul>
            {checkpoints.map((checkpoint, index) => (
              <li key={index}>{checkpoint}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProjectMap;

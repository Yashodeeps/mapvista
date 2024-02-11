import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskState } from "../utils/mapSlice";
import SideSection from "./SideSection";

const ProjectMap = () => {
  console.log("reached projectmap");
  const projectmap = useSelector((store) => store.map);
  const [taskStates, setTaskStates] = useState({});
  console.log(projectmap);
  const dispatch = useDispatch();

  useEffect(() => {
    if (projectmap) {
      const initialState = {};
      Object.keys(projectmap).forEach((heading) => {
        initialState[heading] = projectmap[heading].map(() => false);
      });
      setTaskStates(initialState);
    }
  }, [projectmap]);

  // Function to toggle the checked state of a task
  // const toggleTaskState = (heading, taskIndex) => {
  //   console.log("toggling task state");
  //   const updatedTaskStates = { ...taskStates };
  //   updatedTaskStates[heading][taskIndex] =
  //     !updatedTaskStates[heading][taskIndex];
  //   console.log(updatedTaskStates[heading][taskIndex]);

  //   dispatch(
  //     updateTaskState(heading, taskIndex, updatedTaskStates[heading][taskIndex])
  //   );

  //   return updatedTaskStates;
  // };

  const toggleTaskState = (heading, taskIndex) => {
    console.log("toggling task state");
    const updatedTaskStates = { ...taskStates };
    updatedTaskStates[heading][taskIndex] =
      !updatedTaskStates[heading][taskIndex];
    console.log("boolian", updatedTaskStates[heading][taskIndex]);
    console.log(taskIndex);

    // Dispatch the updateTaskState action with the new task state
    dispatch(
      updateTaskState({
        heading,
        taskIndex,
        checked: updatedTaskStates[heading][taskIndex],
      })
    );

    // Update the local state
    setTaskStates(updatedTaskStates);
  };

  //saving project to database

  // const handleProjectSave = async () => {
  //   const response = await axios.post(
  //     "http://localhost:4000/api/v1/projectmap",
  //     {
  //       projectmap,
  //     }
  //   );

  //   console.log(response);
  // };

  // Check if projectmap is null
  if (!projectmap) {
    return <div>Loading...</div>; // or any other appropriate UI for loading state
  }

  return (
    <div className="flex min-h-screen py-4">
      <SideSection />
      <div>
        <div className="mx-8  ">
          <input
            className="px-4 py-3 rounded-tr-xl bg-gray-200"
            placeholder="Enter Project name"
          />
          <button
            /**onClick={handleProjectSave} */ className="border border-green-600 px-4 py-3 mx-8 my-4 rounded-xl hover:shadow-md"
          >
            Save the Project
          </button>
        </div>
        {Object.entries(projectmap).map(([heading, checkpoints]) => (
          <div key={heading} className="p-4 m-4">
            <h2 className="text-2xl m-4 font-bold text-blue-800">{heading}</h2>
            <ul>
              {checkpoints.map((checkpoint, index) => (
                <li key={index} className="border border-b-gray-200">
                  {/* <input
                  type="checkbox"
                  checked={taskStates[heading] && taskStates[heading][index]}
                  onChange={() => toggleTaskState(heading, index)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                /> */}

                  {checkpoint.checked === true ? (
                    <button
                      className="px-3 py-1 m-2 rounded border border-green-500 bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => toggleTaskState(heading, index)}
                    >
                      {" "}
                      Finished{" "}
                    </button>
                  ) : (
                    <button
                      className="px-3 py-1 m-2 rounded border border-red-500 text-black"
                      onClick={() => toggleTaskState(heading, index)}
                    >
                      Unfinished
                    </button>
                  )}

                  <label>{checkpoint.name}</label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectMap;

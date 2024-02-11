import React, { useEffect, useState } from "react";
import openai from "../utils/openai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMap } from "../utils/mapSlice";
import Shimmer from "./Shimmer";

const GenerateMap = () => {
  const [ideaStatement, setIdeaStatement] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");
  const [gptResult, setGptResult] = useState("");
  const [selectedOption, setSelectedOption] = useState("beginner");
  const [stacks, setStacks] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const options = ["Begineer", "Intermediate", "Advanced"];

  const handleGptQuery = async () => {
    setLoading(true); // Set loading state to true

    const gptQuery = `Given the following 
    1.project idea: ${ideaStatement}
    2.idea description: ${ideaDescription}
    3.Tech stack: ${stacks}
    4.Level: ${selectedOption},
     generate a detailed roadmap for building the project. Please break down the roadmap into specific tasks and group them under appropriate headings such as "Backend," "Frontend," "Deployment," etc. Each task should be clearly defined and actionable. Your response should include a structured list of tasks with headings and checkboxes. Use the format:
  
    # [Heading 1]
      - [Task 1]
      - [Task 2]
    # [Heading 2]
      - [Task 1]
      - [Task 2]

    note: only use "-" and "#" to format the response.
  `;

    const result = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    setGptResult(result.choices[0].message.content);
    console.log(result.choices[0].message.content);
    setLoading(false); // Set loading state to false after getting the response
  };

  useEffect(() => {
    console.log("before useeffect");
    console.log(gptResult);
    if (gptResult) {
      console.log("hola");
      try {
        const tasks = gptResult.split("#").filter((task) => task.trim() !== "");
        let groupedTasks = {};

        tasks.forEach((task) => {
          const splitTask = task.split("-");
          if (splitTask.length < 2) {
            throw new Error("Unexpected response format");
          }

          const [heading, ...tasksUnderHeading] = splitTask;
          const formattedHeading = heading.trim();
          groupedTasks[formattedHeading] = tasksUnderHeading.map((task) => ({
            name: task.trim(),
            checked: false,
          }));
        });
        console.log(groupedTasks);
        // setCheckboxData(groupedTasks);
        dispatch(setMap(groupedTasks));

        navigate("/projectmap");
      } catch (error) {
        console.error("Error parsing GPT-3 response:", error);
      }
    }
  }, [gptResult]);

  if (loading) {
    return <Shimmer />;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen ">
      <div className="flex flex-col justify-center items-center w-1/2 text-center border border-orange-700 rounded-lg">
        <h1 className="text-4xl p-4  font-bold text-blue-900">
          Generate a Structured RoadMap for your Project
        </h1>

        <input
          onChange={(e) => setIdeaStatement(e.target.value)}
          className="text-center  m-2 w-1/2 px-4 py-3 bg-gray-200 rounded-lg mx-auto"
          placeholder="Enter your Stunning idea"
          value={ideaStatement}
        />
        <input
          onChange={(e) => setIdeaDescription(e.target.value)}
          className="text-center  m-2 w-1/2 px-4 py-3 bg-gray-200 rounded-lg mx-auto"
          placeholder="Enter your idea description (optional)"
          value={ideaDescription}
        />

        <div className="flex m-4">
          <div>
            <label className="text-gray-700 text-lg font-bold">
              Tech Stack
            </label>
            <input
              placeholder="React, Redux, ..."
              type="text"
              className="m-2 p-2 bg-gray-200 rounded-lg "
              value={stacks}
              onChange={(e) => {
                setStacks(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center">
            <label className="text-gray-700 text-lg font-bold px-4">
              Level
            </label>
            <select
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e.target.value);
              }}
              className="p-2 border rounded-md"
            >
              {options.map((option) => (
                <option
                  className="cursor-pointer"
                  key={option}
                  value={option.toLowerCase()}
                >
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleGptQuery}
          className="px-4 py-3 m-4 bg-blue-500 text-white hover:bg-blue-800 shadow-lg rounded-xl mx-auto"
        >
          Generate!!!
        </button>
      </div>
    </div>
  );
};

export default GenerateMap;

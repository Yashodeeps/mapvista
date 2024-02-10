import React, { useEffect, useState } from "react";
import openai from "../utils/openai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMap } from "../utils/mapSlice";

const GenerateMap = () => {
  const [ideaStatement, setIdeaStatement] = useState("");
  const [checkboxData, setCheckboxData] = useState([]);
  const [gptResult, setGptResult] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGptQuery = async () => {
    const gptQuery = `Given the following project idea: ${ideaStatement}, generate a detailed roadmap for building the project. Please break down the roadmap into specific tasks and group them under appropriate headings such as "Backend," "Frontend," "Deployment," etc. Each task should be clearly defined and actionable. Your response should include a structured list of tasks with headings and checkboxes. Use the format:
  
    # [Heading 1]
      - [Task 1]
      - [Task 2]
    # [Heading 2]
      - [Task 1]
      - [Task 2]

    note: only use "-" and "#" to format the response.
    
    For example:
      
    # Backend
      - Set up database schema
      - Implement user authentication
    # Frontend
      - Design user interface mockups
      - Develop landing page layout
    # Deployment
      - Configure CI/CD pipeline
      - Deploy application to cloud platform`;

    const result = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    setGptResult(result.choices[0].message.content);
    console.log(result.choices[0].message.content);
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

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl p-4  font-bold text-blue-900">
        Generate a Structured RoadMap for your Project
      </h1>

      <input
        onChange={(e) => setIdeaStatement(e.target.value)}
        className="text-center  m-2 w-1/2 px-4 py-3 bg-gray-200 rounded-lg mx-auto"
        placeholder="Enter your Stunning idea"
        value={ideaStatement}
      />
      <button
        onClick={handleGptQuery}
        className="px-4 py-3 bg-blue-500 text-white hover:bg-blue-800 shadow-lg rounded-xl"
      >
        Generate!!!
      </button>
    </div>
  );
};

export default GenerateMap;

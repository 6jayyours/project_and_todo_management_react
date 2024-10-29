import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../redux/slice/projectSlice";

const Hero = () => {

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId); 
  const [projects, setProjects] = useState([]);
  
  console.log(userId)
  useEffect(() => {
    if (userId) {
      dispatch(getAllProjects(userId))
      .then((response) => {
        console.log("Dispatch response:", response);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
    }
  }, [userId, dispatch]);


  return (
    <div className="flex flex-col items-center px-24 py-6 bg-slate-100 min-h-[566px]">
      <div className="text-4xl font-bold mb-6">PROJECTS</div>

      {/** Project list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10">
      <ProjectCard />
      </div>
    </div>
  );
};

export default Hero;

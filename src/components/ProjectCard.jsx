import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ( { project } ) => {
  return (
    <div className="mt-6 w-72 h-40 bg-white rounded-lg shadow-md flex flex-col justify-center items-center p-4">
      <div className="text-2xl font-bold mb-2">{project.title}</div>
      <div className="text-center text-gray-600 mb-4">{project.createdDate}</div>
      <div className="text-blue-500 cursor-pointer hover:underline">
      <Link to={`/project/${project.id}`}>
        view project
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;

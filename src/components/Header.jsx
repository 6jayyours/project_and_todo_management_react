import React from "react";
import { LuListTodo } from "react-icons/lu";
import { MdLibraryAdd } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../redux/slice/projectSlice";
import Swal from "sweetalert2";

const Header = () => {
  const dispatch = useDispatch();

  // Get userId from Redux state
  const { userId } = useSelector((state) => state.auth);

  // Function to handle project creation
  const handleCreateProject = async () => {
    const { value: projectName } = await Swal.fire({
      title: 'Create New Project',
      input: 'text',
      inputLabel: 'Project Name',
      inputPlaceholder: 'Enter project name',
      showCancelButton: true,
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel',
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage('Please enter a project name');
        }
      },
    });

    // If a project name is entered, dispatch the createProject action
    if (projectName) {
      const projectData = { title: projectName }; 
      dispatch(createProject({ userId, projectData }))
        .then(() => {
          Swal.fire('Success', 'Project created successfully', 'success');
        })
        .catch((error) => {
          Swal.fire('Error', error.message || 'Failed to create project', 'error');
        });
    }
  };

  return (
    <header className="border-b border-solid border-b-[#e7edf3] px-24 py-6">
      <div className="flex items-center justify-between whitespace-nowrap">
        {/* Left section */}
        <div className="flex items-center gap-4 text-[#0e141b]">
          {/* Icon */}
          <div className="flex items-center justify-center">
            <LuListTodo size={40} />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em]">
            TODO
          </h2>
        </div>

        {/* Right section */}
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex gap-4">
            {/* Create Project button */}
            <Link to="/">
              <button
                onClick={handleCreateProject}
                className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#e7edf3] text-[#0e141b] gap-2 text-xl leading-normal tracking-[0.015em] min-w-0 px-2.5"
              >
                <MdLibraryAdd />
                <span className="font-bold text-lg">Create Project</span>
              </button>
            </Link>

            {/* Profile button */}
            <Link to="/">
              <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#e7edf3] text-[#0e141b] gap-2 text-xl leading-normal tracking-[0.015em] min-w-0 px-2.5">
                <CgProfile />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

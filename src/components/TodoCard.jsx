import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import Swal from "sweetalert2";
import { updateTodoStatus } from "../redux/slice/todoSlice";
import { useDispatch } from "react-redux";

const TodoCard = ({ todo, onEdit, onRemove }) => {
  const dispatch = useDispatch();


  const [isCompleted, setIsCompleted] = useState(todo.status);
  const [updatedDate, setUpdatedDate] = useState(todo.updatedDate);

  useEffect(() => {
    setIsCompleted(todo.status);
    setUpdatedDate(todo.updatedDate); 
  }, [todo.status, todo.updatedDate]);
a

// Function to handle toggling the completion of the todo
  const handleToggleCompletion = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to mark this task as completed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, complete it!",
      cancelButtonText: "No, keep it pending",
    });

    if (result.isConfirmed) {
      await dispatch(updateTodoStatus(todo.id)); 
      setIsCompleted(true);
      const currentDate = new Date().toLocaleDateString();
      setUpdatedDate(currentDate);
      Swal.fire("Completed!", "Your task has been marked as completed.", "success");
    }
  };

  return (
    <div
      className={`flex justify-between items-center p-4 border border-gray-300 rounded-lg shadow-md mt-3 ${
        isCompleted ? "bg-green-100" : "bg-white"
      }`}
    >
      <div className="flex gap-x-4 items-center flex-grow">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={isCompleted ? null : handleToggleCompletion} 
          className="form-checkbox h-5 w-5 text-blue-600"
          disabled={isCompleted} // Disable checkbox if completed
        />
        <h3
          className={`text-lg font-semibold ${
            isCompleted ? "line-through text-gray-600" : ""
          }`}
        >
          {todo.description}
        </h3>
      </div>

      {/* Created Date */}
      <div className="flex-shrink-0 w-56 text-gray-500 text-center">
        <p>Created on: {todo.createdDate}</p>
      </div>

      {/* Updated Date */}
      <div className="flex-shrink-0 w-56 text-gray-500 text-center">
        <p>Updated on: {updatedDate}</p> 
      </div>

      {/* Status */}
      <div className="flex-shrink-0 w-32 text-center">
        <span
          className={`text-sm ${
            isCompleted ? "text-green-600" : "text-yellow-600"
          }`}
        >
          {isCompleted ? "Completed" : "Pending"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2 w-24">

        {/** delete */}
        <button
          onClick={onRemove}
          className="flex items-center text-xl text-red-500 hover:underline"
        >
          <MdDelete className="mr-1" />
        </button>

        {/**edit */}
        {!isCompleted && (
          <button
            onClick={onEdit}
            className="flex items-center text-xl text-blue-500 hover:underline"
          >
            <LuClipboardEdit className="mr-1" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoCard;

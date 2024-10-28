import React from "react";
import { MdDelete } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";

const TodoCard = ({ todo, onToggleCompletion, onEdit, onRemove }) => {
  return (
    <div
      className={`flex justify-between items-center p-4 border border-gray-300 rounded-lg shadow-md mt-3 ${
        todo.completed ? "bg-green-100" : "bg-white"
      }`}
    >
      <div className="flex gap-x-4 items-center flex-grow">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={todo.completed ? null : onToggleCompletion} // Disable toggling if completed
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <h3
          className={`text-lg font-semibold ${
            todo.completed ? "line-through text-gray-600" : ""
          }`}
        >
          {todo.description}
        </h3>
      </div>

      {/* created Date */}
      <div className="flex-shrink-0 w-56 text-gray-500 text-center">
        <p>Created on: {todo.date}</p>
      </div>

      {/* updated Date */}
      <div className="flex-shrink-0 w-56 text-gray-500 text-center">
        <p>Latest update on: {todo.date}</p>
      </div>

      {/* Status */}
      <div className="flex-shrink-0 w-32 text-center">
        <span
          className={`text-sm ${
            todo.completed ? "text-green-600" : "text-yellow-600"
          }`}
        >
          {todo.completed ? "Completed" : "Pending"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2 w-24">
        <button
          onClick={onRemove}
          className="flex items-center text-sm text-red-500 hover:underline"
        >
          <MdDelete className="mr-1" />
        </button>
        {!todo.completed && (
          <button
            onClick={onEdit}
            className="flex items-center text-sm text-blue-500 hover:underline"
          >
            <LuClipboardEdit className="mr-1" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoCard;

import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import TodoCard from "./TodoCard";

const Project = () => {

    const [todos, setTodos] = useState([
        { description: "Complete the project documentation", date: "2024-10-30", completed: false },
        { description: "Review code for the new feature", date: "2024-10-31", completed: false },
        { description: "Prepare for the team meeting", date: "2024-11-01", completed: true },
        { description: "Update project roadmap", date: "2024-11-02", completed: false },
        { description: "Fix bugs reported by QA", date: "2024-11-03", completed: true },
      ]);

      const toggleCompletion = (index) => {
        setTodos((prev) => {
          const newTodos = [...prev];
          newTodos[index].completed = !newTodos[index].completed;
          return newTodos;
        });
      };
    
      const removeTodo = (index) => {
        setTodos((prev) => prev.filter((_, i) => i !== index));
      };
    
      const editTodo = (index) => {
        const newDescription = prompt("Edit Todo:", todos[index].description);
        if (newDescription) {
          setTodos((prev) => {
            const newTodos = [...prev];
            newTodos[index].description = newDescription;
            return newTodos;
          });
        }
      };

  return (
    <div className="flex flex-col items-center px-24 py-6 bg-slate-100 min-h-[566px]">
      <div className="container">
        <div className="flex justify-between">
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold mr-2">Product Development</h1>
              <span className="text-gray-500 hover:text-blue-500 transition">
                <FaRegEdit />
              </span>
            </div>
            <p className="text-gray-700 mb-4">This is called data transfer.</p>
          </div>
          <div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Export as Gist
            </button>
          </div>
        </div>
        <div>
          <div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Todos</h2>
            </div>
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                placeholder="Add a new todo"
                className="border border-gray-300 p-2 rounded flex-1 focus:outline-none focus:border-blue-500"
              />
              <input
                type="date"
                className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Add Todo
              </button>
            </div>
          </div>
          <div>
          {todos.map((todo, index) => (
          <TodoCard
            key={index}
            todo={todo}
            onToggleCompletion={() => toggleCompletion(index)}
            onRemove={() => removeTodo(index)}
            onEdit={() => {
              const newDescription = prompt("Edit Todo:", todo.description);
              if (newDescription) {
                editTodo(index, newDescription);
              }
            }}
          />
        ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;

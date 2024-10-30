import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import TodoCard from "./TodoCard";
import { useParams } from "react-router";
import { exportAsGist, getProject } from "../redux/slice/projectSlice";
import { useDispatch } from "react-redux";
import { addTodo, deleteTodo } from "../redux/slice/todoSlice"; // Import the addTodo and deleteTodo actions
import Swal from "sweetalert2"; // Import SweetAlert2

const Project = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const [todos, setTodos] = useState([]);
  const [newTodoDescription, setNewTodoDescription] = useState(""); // State for new todo description
  const [error, setError] = useState(""); // State for error messages

  const formatMarkdown = () => {
    const completed = todos.filter((todo) => todo.status === true);
    const pending = todos.filter((todo) => todo.status === false);

    const markdownContent = `
# ${project.title || "Project Title"}

**Summary**: ${completed.length}/${todos.length} todos completed

## Pending
${pending.map((todo) => `- [ ] ${todo.description}`).join("\n")}

## Completed
${completed.map((todo) => `- [x] ${todo.description}`).join("\n")}
    `;

    return markdownContent.trim();
  };

  useEffect(() => {
    dispatch(getProject(projectId))
      .then((response) => {
        console.log(response.payload);
        setProject(response.payload);
        setTodos(response.payload.todos || []); // Ensure it's an array
      })
      .catch((error) => {
        console.error("Error fetching project:", error);
      });
  }, [dispatch, projectId]);

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

  const handleAddTodo = () => {
    if (!newTodoDescription) {
      setError("Please fill in the description."); // Set error message
      return;
    }

    const todoData = {
      description: newTodoDescription,
      dueDate: new Date().toISOString().split("T")[0], // Set current date
    };

    // Dispatch addTodo action
    dispatch(addTodo({ projectId, todoData }))
      .then((response) => {
        // Update local state with the newly added todo
        console.log(response.payload);
        setTodos((prev) => [...prev, todoData]);
        setNewTodoDescription(""); // Clear the input field
        setError(""); // Clear error message on success
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
        setError("Failed to add todo."); // Set error message if dispatch fails
      });
  };

  const handleExportAsGist = () => {
    console.log("button clicked")
    const markdownContent = formatMarkdown();
    dispatch(exportAsGist({ project, markdownContent }))
      .then((response) => {
        console.log(response.payload)
        Swal.fire("Success!", "Project exported as Gist", "success");
         // Create a downloadable markdown file and trigger download
      const blob = new Blob([markdownContent], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${project.title || "Project"}_TodoList.md`; // Set the default filename
      link.click();

      // Release the blob URL after the download
      URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error exporting gist:", error);
      });
  };

  const handleDeleteTodo = (todoId, index) => {
    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this todo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        // Dispatch deleteTodo action
        dispatch(deleteTodo(todoId))
          .then(() => {
            // Remove the deleted todo from local state
            setTodos((prev) => prev.filter((_, i) => i !== index));
            Swal.fire("Deleted!", "Your todo has been deleted.", "success"); // Show success message
          })
          .catch((error) => {
            console.error("Error deleting todo:", error);
            setError("Failed to delete todo."); // Set error message if dispatch fails
          });
      }
    });
  };

  return (
    <div className="flex flex-col items-center px-24 py-6 bg-slate-100 min-h-[566px]">
      <div className="container">
        <div className="flex justify-between">
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold mr-2">
                {project.title || "Project Title"}
              </h1>
              <span className="text-gray-500 hover:text-blue-500 transition">
                <FaRegEdit />
              </span>
            </div>
            <p className="text-gray-700 mb-4">
              {project.description || "This is called data transfer."}
            </p>
          </div>
          <div>
            <button 
            onClick={handleExportAsGist}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Export as Gist
            </button>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Todos</h2>
            {error && (
              <span className="text-red-500 text-sm">{error}</span>
            )}{" "}
            {/* Display error message */}
          </div>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="Add a new todo"
              value={newTodoDescription}
              onChange={(e) => setNewTodoDescription(e.target.value)} // Update state
              className="border border-gray-300 p-2 rounded flex-1 focus:outline-none focus:border-blue-500"
              required
            />
            <button
              onClick={handleAddTodo} // Add click handler
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Add Todo
            </button>
          </div>
          <div>
            {todos.length === 0 ? (
              <p className="text-gray-500">No todos available</p>
            ) : (
              todos.map((todo, index) => (
                <TodoCard
                  key={index}
                  todo={todo}
                  onRemove={() => handleDeleteTodo(todo.id, index)} // Pass the todo id and index for deletion
                  onEdit={() => editTodo(index)} // Pass the index for editing
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;

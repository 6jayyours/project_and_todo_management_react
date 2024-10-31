import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import TodoCard from "./TodoCard";
import { useParams } from "react-router";
import {
  editProject,
  exportAsGist,
  getProject,
} from "../redux/slice/projectSlice";
import { useDispatch } from "react-redux";
import { addTodo, deleteTodo, updateTodo } from "../redux/slice/todoSlice";
import Swal from "sweetalert2";

const Project = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const [todos, setTodos] = useState([]);
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [error, setError] = useState("");


  // Function to format the todos into markdown for export
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


   // Fetch project data when the component mounts
  useEffect(() => {
    dispatch(getProject(projectId))
      .then((response) => {
        console.log(response.payload);
        setProject(response.payload);
        setTodos(response.payload.todos || []);
      })
      .catch((error) => {
        console.error("Error fetching project:", error);
      });
  }, [dispatch, projectId]);


  // Function to edit a todo based on its index
  const editTodo = (index) => {
    const todoId = todos[index].id;

    Swal.fire({
      title: "Edit Todo",
      input: "text",
      inputValue: todos[index].description,
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const todoData = {
          description: result.value,
        };

        dispatch(updateTodo({ todoId, todoData }))
          .then((response) => {
            if (response.meta.requestStatus === "fulfilled") {
              setTodos((prev) => {
                const updatedTodos = [...prev];
                updatedTodos[index].description = result.value;
                return updatedTodos;
              });
              Swal.fire("Success!", "Todo updated successfully.", "success");
            }
          })
          .catch((error) => {
            console.error("Error updating todo:", error);
            Swal.fire("Error!", "Failed to update todo.", "error");
          });
      }
    });
  };


  // Function to handle adding a new todo
  const handleAddTodo = () => {
    if (!newTodoDescription) {
      setError("Please fill in the description.");
      return;
    }

    const todoData = {
      description: newTodoDescription,
      dueDate: new Date().toISOString().split("T")[0],
    };

    dispatch(addTodo({ projectId, todoData }))
      .then((response) => {
        console.log(response.payload);
        setTodos((prev) => [...prev, todoData]);
        setNewTodoDescription("");
        setError("");
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
        setError("Failed to add todo.");
      });
  };


  // Function to export project as a Gist
  const handleExportAsGist = () => {
    console.log("button clicked");
    const markdownContent = formatMarkdown();
    dispatch(exportAsGist({ project, markdownContent }))
      .then((response) => {
        console.log(response.payload);
        Swal.fire("Success!", "Project exported as Gist", "success");

        const blob = new Blob([markdownContent], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${project.title || "Project"}_TodoList.md`;
        link.click();

        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error exporting gist:", error);
      });
  };


  // Function to handle deleting a todo
  const handleDeleteTodo = (todoId, index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this todo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTodo(todoId))
          .then(() => {
            setTodos((prev) => prev.filter((_, i) => i !== index));
            Swal.fire("Deleted!", "Your todo has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting todo:", error);
            setError("Failed to delete todo.");
          });
      }
    });
  };


   // Function to edit the project title
  const handleEditProject = () => {
    Swal.fire({
      title: "Edit Project Title",
      input: "text",
      inputValue: project.title || "",
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedData = { title: result.value };
        dispatch(editProject({ projectId, updatedData }))
          .then((response) => {
            if (response.meta.requestStatus === "fulfilled") {
              setProject((prev) => ({ ...prev, title: result.value }));
              Swal.fire(
                "Success!",
                "Project title updated successfully.",
                "success"
              );
            }
          })
          .catch((error) => {
            Swal.fire(
              "Error!",
              error.message || "Failed to update project title.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="flex flex-col items-center px-24 py-6 bg-slate-100 min-h-[566px]">
      <div className="container">
        <div className="flex justify-between">

          {/** project title with edit button */}
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold mr-2">
                {project.title || "Project Title"}
              </h1>
              <span
                onClick={handleEditProject}
                className="text-gray-500 hover:text-blue-500 transition cursor-pointer"
              >
                <FaRegEdit />
              </span>
            </div>
          </div>

          {/** export button */}
          <div>
            <button
              onClick={handleExportAsGist}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
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
          </div>

          {/** add todo */}
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="Add a new todo"
              value={newTodoDescription}
              onChange={(e) => setNewTodoDescription(e.target.value)}
              className="border border-gray-300 p-2 rounded flex-1 focus:outline-none focus:border-blue-500"
              required
            />
            <button
              onClick={handleAddTodo}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Add Todo
            </button>
          </div>

          {/**todo lists */}
          <div>
            {todos.length === 0 ? (
              <p className="text-gray-500">No todos available</p>
            ) : (
              todos.map((todo, index) => (
                <TodoCard
                  key={index}
                  todo={todo}
                  onRemove={() => handleDeleteTodo(todo.id, index)}
                  onEdit={() => editTodo(index)}
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

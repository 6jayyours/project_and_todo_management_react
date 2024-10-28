import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Hero from "../components/Hero";
import Project from "../components/Project";
import Login from "../components/Login";
import Register from "../components/Register";
import ProtectedRoute from "./ProtectedRoute ";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={<App />} />,
    children: [
      {
        index: true,
        element: <Hero />,
      },
      {
        path: "project", 
        element: <ProtectedRoute element={<Project />} />, 
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;

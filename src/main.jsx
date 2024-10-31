import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./route/Route.jsx";
import store, { persistor } from "./redux/Store.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </PersistGate>
  </Provider>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from './App';
import Error from "./pages/Error";
import Success from "./pages/Success";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './style.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/success",
    element: <Success />
  },
  {
    path: "/error",
    element: <Error />
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode><RouterProvider router={router} /></React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Crear from "./Crear.jsx";
import "./index.css";
import 'animate.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/crear',
        element: <Crear />
    }
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);

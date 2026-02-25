import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./sprzontando/sprzontando";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./sprzontando/loginPage/LoginPage";
import RegisterPage from "./sprzontando/registerPage/RegisterPage";
import Offerts from "./sprzontando/Offerts/Offerts";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/offerts",
    element: <Offerts />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>,
);

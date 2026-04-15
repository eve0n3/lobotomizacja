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
import SuccessRegister from "./sprzontando/registerPage/SuccessRegister";
import PageLayout from "./sprzontando/PageLayout";
import UsersRanking from "./sprzontando/usersRanking/UsersRanking";
import SuccessVerification from "./sprzontando/registerPage/SuccessVerification";
import AddOffer from "./sprzontando/AddOffer/AddOffer";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/successRegister",
    element: <SuccessRegister />,
  },
  {
    path: "/successVerification",
    element: <SuccessVerification />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Offerts />,
      },
      {
        path: "/usersRanking",
        element: <UsersRanking />,
      },
      {
        path: "/addOffer",
        element: <AddOffer />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);

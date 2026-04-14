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
import OfferDetails from "./sprzontando/Offerts/OfferDetails"

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
    element: <PageLayout />,
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
        path: "offer/:id",
        element: <OfferDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>,
);

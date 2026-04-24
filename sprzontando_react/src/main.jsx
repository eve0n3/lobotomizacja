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
import OfferDetails from "./sprzontando/Offerts/OfferDetails";
import AddOffer from "./sprzontando/AddOffer/AddOffer";
import EditOffer from "./sprzontando/AddOffer/EditOffer";
import UserProfile from "./sprzontando/userProfile/UserProfile";
import MyOffers from "./sprzontando/userOffers/MyOffers";
import MyApplications from "./sprzontando/userOffers/MyApplications";
import PasswordResetPage from "./sprzontando/passwordReset/PasswordResetPage";
import AdminDashboard from "./sprzontando/admin/AdminDashboard";
import {
  ADD_OFFER_LOCATION,
  ADMIN_LOCATION,
  EDIT_OFFER_LOCATION,
  HOME_LOCATION,
  LOGIN_LOCATION,
  MY_APPLICATIONS_LOCATION,
  MY_OFFERS_LOCATION,
  PROFILE_LOCATION,
  REGISTER_LOCATION,
  RESET_PASSWORD_LOCATION,
  SUCCESS_REGISTER_LOCATION,
  SUCCESS_VERIFICATION_LOCATION,
  USERS_RANKING_LOCATION,
} from "../utils/consts";

const router = createBrowserRouter([
  {
    path: LOGIN_LOCATION,
    element: <LoginPage />,
  },
  {
    path: REGISTER_LOCATION,
    element: <RegisterPage />,
  },
  {
    path: SUCCESS_REGISTER_LOCATION,
    element: <SuccessRegister />,
  },
  {
    path: SUCCESS_VERIFICATION_LOCATION,
    element: <SuccessVerification />,
  },
  {
    path: RESET_PASSWORD_LOCATION,
    element: <PasswordResetPage />,
  },
  {
    path: HOME_LOCATION,
    element: <App />,
    children: [
      {
        index: true,
        element: <Offerts />,
      },
      {
        path: USERS_RANKING_LOCATION,
        element: <UsersRanking />,
      },
      {
        path: "/offer",
        element: <OfferDetails />,
      },
      {
        path: ADD_OFFER_LOCATION,
        element: <AddOffer />,
      },
      {
        path: EDIT_OFFER_LOCATION,
        element: <EditOffer />,
      },
      {
        path: PROFILE_LOCATION,
        element: <UserProfile />,
      },
      {
        path: MY_OFFERS_LOCATION,
        element: <MyOffers />,
      },
      {
        path: MY_APPLICATIONS_LOCATION,
        element: <MyApplications />,
      },
      {
        path: ADMIN_LOCATION,
        element: <AdminDashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);

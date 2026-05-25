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
import {
  ADD_OFFER_LOCATION,
  EDIT_OFFER_LOCATION,
  HOME_LOCATION,
  LOGIN_LOCATION,
  LOGIN_RESET_LOCATION,
  MY_APPLICATIONS_LOCATION,
  OTHER_USER_PROFILE_LOCATION,
  REGISTER_LOCATION,
  REPORTED_OFFERS_LOCATION,
  SUCCESS_PASSWORD_RESET_LOCATION,
  SUCCESS_REGISTER_LOCATION,
  SUCCESS_VERIFICATION_LOCATION,
  USER_PROFILE_LOCATION,
  USERS_RANKING_LOCATION,
  ADMIN_USERS_LOCATION,
} from "../utils/consts";
import UserProfile from "./sprzontando/UserProfile/UserProfile";
import MyOffers from "./sprzontando/MyOffers/MyOffers";
import OtherUserProfile from "./sprzontando/UserProfile/OtherUserProfile";
import ReportedOffers from "./sprzontando/ReportedOffers/ReportedOffers";
import ReportedOfferDetails from "./sprzontando/ReportedOffers/ReportedOfferDetails";
import ResetPasswordPage from "./sprzontando/loginPage/ResetPasswordPage";
import SuccessPasswordReset from "./sprzontando/loginPage/SuccessPasswordReset";
import EditOffer from "./sprzontando/EditOffer/EditOffer";
import AdminUsers from "./sprzontando/AdminUsers/AdminUsers";
import MyApplicationsList from "./sprzontando/sidePanel/MyApplicationsList";
import MyOfferAppliedUsers from "./sprzontando/MyOffers/MyOfferAppliedUsers";
import MyOffersApplications from "./sprzontando/MyOffersApplications/MyOffersApplications";

const router = createBrowserRouter([
  {
    path: LOGIN_LOCATION,
    element: <LoginPage />,
  },
  {
    path: LOGIN_RESET_LOCATION,
    element: <ResetPasswordPage />,
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
    path: SUCCESS_PASSWORD_RESET_LOCATION,
    element: <SuccessPasswordReset />,
  },
  {
    path: SUCCESS_VERIFICATION_LOCATION,
    element: <SuccessVerification />,
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
        path: USER_PROFILE_LOCATION,
        element: <UserProfile />,
      },
      {
        path: "/myOffers",
        element: <MyOffers />,
      },
      {
        path: OTHER_USER_PROFILE_LOCATION,
        element: <OtherUserProfile />,
      },
      {
        path: REPORTED_OFFERS_LOCATION,
        element: <ReportedOffers />,
      },
      {
        path: "/reportedOffer",
        element: <ReportedOfferDetails />,
      },
      {
        path: EDIT_OFFER_LOCATION,
        element: <EditOffer />,
      },
      {
        path: ADMIN_USERS_LOCATION,
        element: <AdminUsers />,
      },{
        path: MY_APPLICATIONS_LOCATION,
        element: <MyOffersApplications />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);

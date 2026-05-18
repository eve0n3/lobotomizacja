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
  HOME_LOCATION,
  LOGIN_LOCATION,
  OTHER_USER_PROFILE_LOCATION,
  REGISTER_LOCATION,
  REPORTED_OFFERS_LOCATION,
  SUCCESS_REGISTER_LOCATION,
  SUCCESS_VERIFICATION_LOCATION,
  USER_PROFILE_LOCATION,
  USERS_RANKING_LOCATION,
} from "../utils/consts";
import UserProfile from "./sprzontando/UserProfile/UserProfile";
import MyOffers from "./sprzontando/MyOffers/MyOffers";
import OtherUserProfile from "./sprzontando/UserProfile/OtherUserProfile";
import ReportedOffers from "./sprzontando/ReportedOffers/ReportedOffers";
import ReportedOfferDetails from "./sprzontando/ReportedOffers/ReportedOfferDetails";

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
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);

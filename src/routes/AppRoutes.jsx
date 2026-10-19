import { Route, Routes } from "react-router";

import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import LandingPage from "../pages/LandingPage";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import ProfilePage from "../pages/ProfilePage";
import SettingPage from "../pages/SettingPage";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import RequestsPage from "../pages/RequestsPage";
import ConnectionsPage from "../pages/ConnectionsPage";
import FeedPage from "../pages/FeedPage";


const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<AuthenticatedLayout />}>
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingPage />} />

          {/* Add these routes when the pages are ready */}
          <Route path="/connections" element={<ConnectionsPage />} />
          <Route path="/requests" element={<RequestsPage />} />
          {/* <Route path="/messages" element={<MessagesPage />} /> */}
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;

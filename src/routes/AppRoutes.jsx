import { Route, Routes } from "react-router";

import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import LandingPage from "../pages/LandingPage";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import ProfilePage from "../pages/ProfilePage";

const FeedPage = () => <div>Developer feed coming soon</div>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

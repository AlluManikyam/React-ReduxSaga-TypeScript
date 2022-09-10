import * as React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "components/NotFound";
import { ROLE } from "model/auth";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import Loader from "components/Common/Loader";

const LoginPage = React.lazy(() => import("containers/Auth/Login"));
const DashboardPage = React.lazy(() => import("containers/Dashboard"));


const Main = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <Routes>
      <Route path="/" element={<PublicRoute  component={LoginPage} />} />
        <Route path="/login" element={<PublicRoute  component={LoginPage} />} />
        <Route path="/dashboard"  element={<PrivateRoute roles={[ROLE.USER]} component={DashboardPage} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  );
};
export default Main;

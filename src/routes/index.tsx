import * as React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "components/NotFound";
import { ROLE } from "model/auth";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import Loader from "components/Common/Loader";

const ProtectedLayout = React.lazy(
  () => import("containers/Layouts/ProtectedLayout")
);
const Login = React.lazy(() => import("containers/Auth/Login"));
const Dashboard = React.lazy(() => import("containers/Dashboard"));
const AddUser = React.lazy(() => import("containers/UserManagement/AddUser"));

const Main = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<PublicRoute component={Login} />} />
        <Route path="/login" element={<PublicRoute component={Login} />} />
        <Route element={<ProtectedLayout />}>
          <Route
            path="/dashboard"
            element={<PrivateRoute roles={[ROLE.USER]} component={Dashboard} />}
          />
          <Route
            path="/add-user"
            element={<PrivateRoute roles={[ROLE.USER]} component={AddUser} />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  );
};
export default Main;

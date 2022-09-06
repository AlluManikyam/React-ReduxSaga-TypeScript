import * as React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../components/NotFound";
import { ROLE } from "../model/auth";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

const LoginPage = React.lazy(() => import("../containers/Auth/Login"));
const TodoPage = React.lazy(() => import("../containers/Todos"));

const Loading = () => <p>Loading ...</p>;

const Main = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<PrivateRoute roles={[ROLE.ADMIN]} component={TodoPage} />} />
        <Route path="/login" element={<PublicRoute  component={LoginPage} />} />
        <Route path="/home"  element={<PrivateRoute roles={[ROLE.ADMIN]} component={TodoPage} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  );
};
export default Main;

import { Navigate } from "react-router-dom";
import { getLoggedInUser } from "utils/helpers/authUtils";

interface Props {
  component: React.ComponentType;
  path?: string;
}

export const PublicRoute: React.FC<Props> = ({ component: RouteComponent }) => {
  const isAuthenticated = getLoggedInUser();

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return <RouteComponent />;
};

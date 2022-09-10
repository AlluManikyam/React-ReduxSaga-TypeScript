import { Navigate } from "react-router-dom";
import AccessDenied from "components/AccessDenied";
import { User, ROLE } from "model/auth";
import { getLoggedInUser } from "utils/helpers/authUtils";

interface Props {
  component: React.ComponentType;
  path?: string;
  roles: Array<ROLE>;
}

export const PrivateRoute: React.FC<Props> = ({
  component: RouteComponent,
  roles,
}) => {
  const user: User = {
    firstName: "Manikyam",
    lastName: "Allu",
    role: ROLE.USER,
  }; 
  
  const isAuthenticated = getLoggedInUser();
  const userHasRequiredRole = user && roles.includes(user.role) ? true : false;
  
  if (isAuthenticated && userHasRequiredRole) {
    return <RouteComponent />;
  }

  if (isAuthenticated && !userHasRequiredRole) {
    return <AccessDenied />;
  }

  return <Navigate to="/login" />;
};

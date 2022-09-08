import { Navigate } from "react-router-dom";
// import { useSelector } from 'react-redux'
import AccessDenied from "components/AccessDenied";
import { User, ROLE } from "model/auth";
// import { selectCurrentUser, selectIsAuthenticated } from './features/auth/authSlice'

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
    role: ROLE.ADMIN,
  }; //useSelector(selectCurrentUser)
  
  const isAuthenticated = true; //useSelector(selectIsAuthenticated)
  const userHasRequiredRole = user && roles.includes(user.role) ? true : false;
  
  if (isAuthenticated && userHasRequiredRole) {
    return <RouteComponent />;
  }

  if (isAuthenticated && !userHasRequiredRole) {
    return <AccessDenied />;
  }

  return <Navigate to="/login" />;
};

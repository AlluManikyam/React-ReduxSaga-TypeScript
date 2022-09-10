import { Navigate } from "react-router-dom";
import { getLoggedInUser } from "utils/helpers/authUtils";

// import { useSelector } from 'react-redux'
// import { selectCurrentUser, selectIsAuthenticated } from './features/auth/authSlice'

interface Props {
  component: React.ComponentType;
  path?: string;
}

export const PublicRoute: React.FC<Props> = ({ component: RouteComponent }) => {
  const isAuthenticated = getLoggedInUser(); //useSelector(selectIsAuthenticated)

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return <RouteComponent />;
};

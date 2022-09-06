import { Navigate } from "react-router-dom";
// import { useSelector } from 'react-redux'
// import { selectCurrentUser, selectIsAuthenticated } from './features/auth/authSlice'

interface Props {
  component: React.ComponentType;
  path?: string;
}

export const PublicRoute: React.FC<Props> = ({ component: RouteComponent }) => {
  const isAuthenticated = false; //useSelector(selectIsAuthenticated)

  if (isAuthenticated) {
    return <Navigate to='/home' />;
  }

  return <RouteComponent />;
};

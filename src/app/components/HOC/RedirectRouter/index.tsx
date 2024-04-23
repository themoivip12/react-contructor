import { path } from 'app/routes/path';
import { Navigate } from 'react-router';
import { isAuthenticated } from 'utils/auth';

interface Props {
  privatePage?: boolean;
  children: JSX.Element;
}

export const RedirectRouter = ({ privatePage, children }: Props) => {
  if (privatePage && !isAuthenticated()) {
    return <Navigate to={path.login} />;
  }
  if (!privatePage && isAuthenticated()) {
    return <Navigate to={path.home} />;
  }
  return children;
};

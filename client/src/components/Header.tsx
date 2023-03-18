import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { AuthType } from '../types';
import { LOGOUT_USER } from '../graphql/mutations/user';

type HeaderProps = {
  refetchUser: Function,
} & AuthType;

export const Header = ({
  isAuthenticated,
  refetchUser,
}: HeaderProps) => {
  const [logoutUserFn] = useMutation<
    { logoutUserFn: void }
  >(LOGOUT_USER);

  const logout = async () => {
    await logoutUserFn();
    await refetchUser();
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left">Home</Link>
        <ul className="right">
          {isAuthenticated ?
            (<li>
              <a onClick={() => logout()}>Logout</a>
            </li>) :
            (<div>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </div>)}
        </ul>
      </div>
    </nav>
  );
};
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { jwtDecode } from 'jwt-decode';


function useAuthUser(): string | null {
  debugger
  const { token } = useAuth();

   if (!token) {
    return null;
  }

  try {
    const payload = jwtDecode<any>(token);

    return (
      payload.name ??
      payload.unique_name ??
      payload.email ??
      payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ??
      payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] ??
      payload.sub ??
      null
    );
  } catch {
    return null;
  }
}



export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  debugger;
  const username = useAuthUser();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Request Approval
        </Link>

        {isAuthenticated && (
          <nav className="nav">
             <span className="username">
               {username}
            </span>
            <Link to="/requests">درخواست‌ها</Link> |
            <Link to="/requests/new">درخواست جدید</Link> |

            <button
              type="button"
              onClick={logout}
              className="logout-button"
            >
              خروج
            </button>
          </nav>
        )}

        {!isAuthenticated && (
          <nav className="nav">
            <Link to="/login">ورود</Link>
            <Link to="/register">ثبت‌نام</Link>
          </nav>
        )}
      </div>
    </header>
  );
}

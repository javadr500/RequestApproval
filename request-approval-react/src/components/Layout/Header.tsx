import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Request Approval
        </Link>

        {isAuthenticated && (
          <nav className="nav">
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

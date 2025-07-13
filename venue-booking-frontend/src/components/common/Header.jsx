import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-indigo-600">Venue Booking</Link>
        <nav className="flex items-center space-x-4">
          {user ? (
            <>
              {user.role === 'owner' || user.role === 'admin' ? (
                <Link to="/owner" className="text-gray-600 hover:text-indigo-600">Owner Dashboard</Link>
              ) : null}
              {user.role === 'admin' ? (
                <Link to="/admin" className="text-gray-600 hover:text-indigo-600">Admin Dashboard</Link>
              ) : null}
              <Link to="/user" className="text-gray-600 hover:text-indigo-600">My Bookings</Link>
              <button 
                onClick={logout}
                className="text-gray-600 hover:text-indigo-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-indigo-600">Login</Link>
              <Link to="/register" className="text-gray-600 hover:text-indigo-600">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

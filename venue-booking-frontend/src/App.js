import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import Home from './pages/Home';
import OwnerDashboard from './pages/OwnerDashboard';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/common/Header';
import VenueDetail from './components/venue/VenueDetail';


function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/owner" element={
                <PrivateRoute roles={['owner', 'admin']}>
                  <OwnerDashboard />
                </PrivateRoute>
              } />
              <Route path="/user" element={
                <PrivateRoute>
                  <UserDashboard />
                </PrivateRoute>
              } />
              <Route path="/admin" element={
                <PrivateRoute roles={['admin']}>
                  <AdminDashboard />
                </PrivateRoute>
              } />
              <Route path="/venue/:id" element={<VenueDetail />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

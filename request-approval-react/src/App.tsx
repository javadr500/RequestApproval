
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { ProtectedRoute } from './auth/ProtectedRoute';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import RequestList from './pages/Requests/RequestList';
import RequestForm from './pages/Requests/RequestForm';
import MainLayout from './components/Layout/MainLayout';


export default function App() {
  return (
    <AuthProvider>

      <BrowserRouter>

        <Routes>

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />} >

              <Route
                path="/requests"
                element={<RequestList />}
              />

              <Route
                path="/requests/new"
                element={<RequestForm />}
              />

            </Route>
          </Route>

          <Route
            path="/"
            element={
              <Navigate
                to="/requests"
                replace
              />
            }
          />

          <Route
            path="*"
            element={
              <Navigate
                to="/requests"
                replace
              />
            }
          />

        </Routes>

      </BrowserRouter>

    </AuthProvider>
  );
}


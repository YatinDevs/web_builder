import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AuthRedirect from "./components/AuthRedirect/AuthRedirect";
import useAuthStore from "./store/authStore";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import CustomizeTemplate from "./components/CustomizeTemplate/CustomizeTemplate";

function App() {
  const { checkAuth, user, isAuthenticated } = useAuthStore();
  console.log(user);
  console.log(isAuthenticated);
  useEffect(() => {
    checkAuth(); // Check authentication on mount
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Route with Auth Redirect */}
        <Route
          path="/login"
          element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRedirect>
              <Signup />
            </AuthRedirect>
          }
        />
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/customize" element={<CustomizeTemplate />} />{" "}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

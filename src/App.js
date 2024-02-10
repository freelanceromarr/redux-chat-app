import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import InboxPage from "./pages/inbox";
import { Route, BrowserRouter as Routers, Routes } from "react-router-dom";
import useAuthCheck from "./hooks/useAuthCheck";
import PrivateRoute from "./compontents/PrivateRoute";
import PublicRoute from "./compontents/PublicRoute";
import Conversations from "./compontents/inbox/Conversations";

function App() {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <div>Checking Authentication ...</div>
  ) : (
    <Routers>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="/inbox"
            element={
              <PrivateRoute>
                <InboxPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/inbox/:id"
            element={
              <PrivateRoute>
                <InboxPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Routers>
  );
}

export default App;

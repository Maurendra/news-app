import React, { Fragment } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import List from "../pages/List";
import AuthContext from "../contexts/AuthContext";
import Header from "../components/Header";

const RequireAuth = ({ children }) => {
  const { auth } = React.useContext(AuthContext);
  let location = useLocation();
  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const CheckAuth = ({ children }) => {
  const { auth } = React.useContext(AuthContext);
  let location = useLocation();
  if (auth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default function App(props) {
  const location = useLocation();

  return (
    <>
    <Header />
    <Routes>
      <Route
        exact
        path="/"
        element={
          <Home />
        }
      />
      <Route
        exact
        path="/list"
        element={
          <List />
        }
      />
    </Routes>
    </>
  );
}

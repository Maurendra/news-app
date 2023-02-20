import React, { useEffect, Suspense } from "react";
import {
  BrowserRouter as Router
} from "react-router-dom";
import AppRouter from "./AppRouter";
import Provider from "./config/data/Provider";
import AuthProvider from "./providers/AuthProvider";
import './App.css';

export default () => {
  useEffect(() => {
    Provider.init();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <AppRouter />
      </Router>
    </AuthProvider>
  );
};

import Login from "@pages/auth/login";
import MyCart from "@pages/my-cart";
import ProtectedRoute from "@shared/utils/protected-routes";
import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "@pages/home";

const Home = lazy(() => import("@pages/home"));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-cart"
          element={
            <ProtectedRoute>
              <MyCart />
            </ProtectedRoute>
          }
        />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

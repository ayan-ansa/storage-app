import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./globals.css";
import { Dashboard } from "./pages/Dashboard.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ModalProvider } from "./contexts/ModalContext.jsx";
import Modals from "./components/ModalContainer.jsx";
import Settings from "./pages/Settings.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import AdminUserView from "./pages/AdminUserView.jsx";
import AdminView from "./pages/AdminView.jsx";

export const router = createBrowserRouter([
  // Public routes (no layout)
  { path: "/", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  // Protected / App routes (with Navbar)
  {
    element: <MainLayout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/directory/:dirId?", element: <Dashboard /> },
      { path: "/settings", element: <Settings /> },
      { path: "/users", element: <AdminView /> },
      { path: "/users/:userId/:dirId?", element: <AdminUserView /> },
    ],
  },

  { path: "*", element: <div className="p-4">404 Not Found</div> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <ModalProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" richColors closeButton />
          <Modals />
        </ModalProvider>
      </GoogleOAuthProvider>
    </AuthProvider>
  </StrictMode>,
);

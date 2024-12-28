import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { ManagerLoginPage } from "../pages/manager/ManagerLoginPage";
import { AdminLoginPage } from "../pages/admin/AdminLoginPage";
import { AdminRegisterPage } from "../pages/admin/AdminRegisterPage";
import { ManagerRegisterPage } from "../pages/manager/ManagerRegisterPage";
import { Home } from "../pages/Home";
import { ManagerProtectedRoute } from "./ProtectedRoute";
import { AdminProtectedRoute } from "./AdminProtectedRoute";
import { AdminProfile } from "../pages/admin/AdminProfile";
import { ManagerProfile } from "../pages/manager/ManagerProfile";
import { ContactUs } from "../pages/ContactUs";
import { EnquiryForm } from "../pages/EnquiryForm";
import { RegistrationForm } from "../pages/RegistrationForm";
import GradientInfotechForm from "../pages/manager/Form";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/manager-login",
        element: <ManagerLoginPage />,
      },
      {
        path: "/admin-login",
        element: <AdminLoginPage />,
      },
      {
        path: "/admin-register",
        element: <AdminRegisterPage />,
      },
      {
        path: "/manager-register",
        element: <ManagerRegisterPage />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/manager",
        element: <ManagerProtectedRoute />,
        children: [
          {
            path: "/manager/profile",
            element: <ManagerProfile />,
          },
          {
            path: "/manager/enquiry-form",
            element: <EnquiryForm />,
          },
          {
            path: "/manager/registration-form",
            element: <RegistrationForm />,
          },
          {
            path: "/manager/form",
            element: <GradientInfotechForm />,
          },
        ],
      },
      {
        path: "/admin",
        element: <AdminProtectedRoute />,
        children: [
          {
            path: "/admin/profile",
            element: <AdminProfile />,
          },
        ],
      },
    ],
  },
]);

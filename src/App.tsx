import { QueryClientProvider } from "react-query";
import AuthProvider from "react-auth-kit";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import dayjs from "dayjs";
import i18next from "i18next";

import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import setupQueryClient from "config/query/setupQueryClient";
import setupAuth from "config/auth/setupAuth";
import setupTheme from "config/theme/setupTheme";

import MainLayout from "components/MainLayout";
import AuthLayout from "components/AuthLayout";

import Login from "pages/Login";
import Logout from "pages/Logout";
import ForgotPassword from "pages/ForgotPassword";
import ResetPassword from "pages/ResetPassword";
import NotFound from "pages/NotFound";

import ApplicantRoute from "routes/applicant";
import IssuedCardRoute from "routes/issued-card";
import AppointmentRoute from "routes/appointment";
import OverviewRoute from "routes/overview";
import NotificationRoute from "routes/notification";

import './App.css';
import { Suspense } from "react";
import PageLoader from "components/PageLoader";

import 'dayjs/locale/en';
import 'dayjs/locale/pt';
import { ToasterProvider } from "contexts/ToasterContext";

dayjs.locale(i18next.resolvedLanguage);

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ToasterProvider>
        <QueryClientProvider client={setupQueryClient()}>
          <AuthProvider store={setupAuth()}>
            <ThemeProvider theme={setupTheme()}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <BrowserRouter>
                  <Routes>
                    <Route element={<MainLayout />}>
                      <Route path="/applicant/*" element={<ApplicantRoute />} />
                      <Route path="/issued-card/*" element={<IssuedCardRoute />} />
                      <Route path="/appointment/*" element={<AppointmentRoute />} />
                      <Route path="/notification" element={<NotificationRoute />} />
                      <Route path="/" element={<OverviewRoute />} />
                      <Route path="*" element={<NotFound />} />
                    </Route>
                    <Route element={<AuthLayout />}>
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                      <Route path="/reset-password" element={<ResetPassword />} />
                      <Route path="/login" element={<Login />} />
                    </Route>
                    <Route path="/logout" element={<Logout />} />
                  </Routes>
                </BrowserRouter>
              </LocalizationProvider>
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ToasterProvider>
    </Suspense>
  );
}

export default App;

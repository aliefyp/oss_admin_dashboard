import { QueryClientProvider } from "react-query";
import AuthProvider from "react-auth-kit";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import dayjs from "dayjs";
import i18next from "i18next";

import { ThemeProvider } from '@mui/material/styles';

import setupQueryClient from "config/query/setupQueryClient";
import setupAuth from "config/auth/setupAuth";
import setupTheme from "config/theme/setupTheme";

import MainLayout from "components/MainLayout";
import AuthLayout from "components/AuthLayout";

import Overview from "pages/Overview";
import Login from "pages/Login";
import ForgotPassword from "pages/ForgotPassword";
import ResetPassword from "pages/ResetPassword";
import NotFound from "pages/NotFound";

import ApplicantRoute from "routes/applicant";
import IssuedCardRoute from "routes/issued-card";

import './App.css';
import { Suspense } from "react";
import PageLoader from "components/PageLoader";

dayjs.locale(i18next.resolvedLanguage);

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <QueryClientProvider client={setupQueryClient()}>
        <AuthProvider store={setupAuth()}>
          <ThemeProvider theme={setupTheme()}>
            <BrowserRouter>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Overview />} />
                  <Route path="/applicant/*" element={<ApplicantRoute />} />
                  <Route path="/issued-card/*" element={<IssuedCardRoute />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
                <Route element={<AuthLayout />}>
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/login" element={<Login />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;

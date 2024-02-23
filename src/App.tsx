import { QueryClientProvider } from "react-query";
import AuthProvider from "react-auth-kit";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';

import setupLanguage from "config/language/setupLanguage";
import setupQueryClient from "config/query/setupQueryClient";
import setupAuth from "config/auth/setupAuth";
import setupTheme from "config/theme/setupTheme";

import MainLayout from "components/MainLayout";
import AuthLayout from "components/AuthLayout";

import Applicants from "pages/Applicants";
import ApplicantDetail from "pages/ApplicantDetail";
import IssuedCards from "pages/IssuedCards";
import Overview from "pages/Overview";
import Login from "pages/Login";
import ForgotPassword from "pages/ForgotPassword";
import ResetPassword from "pages/ResetPassword";
import NotFound from "pages/NotFound";

import dictionary from "dictionary";

import './App.css';

setupLanguage(dictionary);

function App() {
  return (
    <QueryClientProvider client={setupQueryClient()}>
      <AuthProvider store={setupAuth()}>
        <ThemeProvider theme={setupTheme()}>
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Overview />} />
                <Route path="/applicant" element={<Applicants />} />
                <Route path="/applicant/:applicant_id" element={<ApplicantDetail />} />
                <Route path="/issued" element={<IssuedCards />} />
                <Route path="/issued/:issued_id" element={<IssuedCards />} />
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
  );
}

export default App;

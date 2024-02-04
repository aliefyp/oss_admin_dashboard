import { QueryClientProvider } from "react-query";
import AuthProvider from "react-auth-kit";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';

import setupLanguage from "config/language/setupLanguage";
import setupQueryClient from "config/query/setupQueryClient";
import setupAuth from "config/auth/setupAuth";

import MainLayout from "components/MainLayout";

import dictionary from "dictionary";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import theme from "config/theme";

setupLanguage(dictionary);

function App() {
  return (
    <QueryClientProvider client={setupQueryClient()}>
      <AuthProvider store={setupAuth()}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<div>Login</div>} />
              <Route element={<MainLayout />}>
                <Route path="/" element={<div>Dashboard</div>} />
                <Route path="/products" element={<div>Products</div>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

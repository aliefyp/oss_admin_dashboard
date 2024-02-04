import { QueryClientProvider } from "react-query";
import AuthProvider from "react-auth-kit";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'

import setupLanguage from "config/language/setupLanguage";
import setupQueryClient from "config/query/setupQueryClient";
import setupAuth from "config/auth/setupAuth";

import dictionary from "dictionary";
import './App.css';

setupLanguage(dictionary);

function App() {
  return (
    <QueryClientProvider client={setupQueryClient()}>
      <AuthProvider store={setupAuth()}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/login" element={<div>Login</div>} />
            <Route element={<AuthOutlet fallbackPath="/login" />}>
              <Route path="/dashboard" element={<div>Dashboard</div>} />
              <Route path="/products" element={<div>Products</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.tsx';
import TaskDetailPage from './pages/TaskDetailPage.tsx';

import RegisterPage from './auth/RegisterPage.tsx';
import LoginPage from './auth/LoginPage.tsx';
import AuthGuard from './auth/AuthGuard.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/"
          element={
            <AuthGuard>
              <App />
            </AuthGuard>
          }
        />
        <Route
          path="/task/:id"
          element={
            <AuthGuard>
              <TaskDetailPage />
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

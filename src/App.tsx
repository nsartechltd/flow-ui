import { Routes, Route } from 'react-router-dom'

import { LoginPage } from '@pages/LoginPage';
import { HomePage } from '@pages/HomePage';
import { ResetPasswordPage } from '@pages/ResetPasswordPage';

export default function App() {
  return (
    <div className="container mx-auto w-full h-screen bg-flow-blue">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </div>
  )
}
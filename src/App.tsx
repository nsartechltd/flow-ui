import { Routes, Route } from 'react-router-dom'

import { LoginPage } from '@pages/LoginPage';

export default function App() {
  return (
    <div className="container mx-auto w-full h-screen">
      <Routes>
        <Route path="/" element={<h1>Flow</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        <Route path="/reset-password" element={<h1>Reset Password</h1>} />
      </Routes>
    </div>
  )
}
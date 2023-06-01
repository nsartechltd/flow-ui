import { Routes, Route } from 'react-router-dom'

import { LoginPage } from '@pages/LoginPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Flow</h1>} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@stores/authStore';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  return <h1>Dashboard</h1>;
};

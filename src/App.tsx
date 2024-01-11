import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { BackgroundImage } from '@components/Image';
import { LoginPage } from '@pages/LoginPage';
import { ResetPasswordPage } from '@pages/ResetPasswordPage';
import { CheckoutPage } from '@pages/CheckoutPage';
import { SignUpPage } from '@pages/SignUpPage';
import { VerifyPage } from '@pages/VerifyPage';
import { SubscriptionStatusPage } from '@pages/SubscriptionStatusPage';
import { NotFoundPage } from '@pages/NotFoundPage';
import { DashboardPage } from '@pages/DashboardPage';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <BackgroundImage url="./images/background-image.png">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/subscription-status"
            element={<SubscriptionStatusPage />}
          />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </QueryClientProvider>
    </BackgroundImage>
  );
}

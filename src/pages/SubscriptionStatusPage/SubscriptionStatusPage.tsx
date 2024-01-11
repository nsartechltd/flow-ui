import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FadeLoader from 'react-spinners/FadeLoader';

import { useStripeStore } from '@stores/stripeStore';

export const SubscriptionStatusPage = () => {
  const navigate = useNavigate();
  const { getSession, status, customerEmail } = useStripeStore();
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get('session_id');
  const priceId = searchParams.get('price_id');

  useEffect(() => {
    getSession(sessionId ?? '');

    if (status === 'open') {
      navigate('/checkout', {
        replace: true,
        state: { email: customerEmail, priceId },
      });
    } else {
      const timer = setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 5000);

      // Cleanup the timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [getSession, sessionId, customerEmail, priceId, navigate, status]);

  return (
    <div className="flex flex-col items-center justify-around h-screen">
      <h1 className="text-white text-2xl">Payment Successful!</h1>
      <p className="text-white text-1xl">
        Your payment was successful. You will be redirected shortly.
      </p>
      <FadeLoader color="#ffffff" />
    </div>
  );
};

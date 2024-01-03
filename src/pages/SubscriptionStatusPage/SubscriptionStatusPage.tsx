import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

type GetSessionData = {
  customerEmail?: string;
  status: string;
  paymentStatus: string;
};

export const SubscriptionStatusPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [session, setSession] = useState<GetSessionData>();

  const sessionId = searchParams.get('session_id');
  const priceId = searchParams.get('price_id');

  const getSession = async () => {
    const session = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_FLOW_API_URL}/stripe/session/${sessionId}`,
    });

    setSession(session.data);
  };

  useEffect(() => {
    getSession();
  });

  if (session?.status === 'open') {
    navigate('/checkout', {
      replace: true,
      state: { email: session.customerEmail, priceId },
    });
    return null;
  }

  navigate('/dashboard', { replace: true });

  return <h1>Success</h1>;
};

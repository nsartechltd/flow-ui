import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import axios from 'axios';

export type CheckoutPageProps = {
  clientSecret: string;
};

const stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY, {});

export const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState('');
  const location = useLocation();

  const createSession = async () => {
    const session = await axios({
      method: 'POST',
      url: `${import.meta.env.VITE_FLOW_API_URL}/stripe/session`,
      headers: { 'Content-Type': 'application/json' },
      data: { priceId: location.state.priceId, email: location.state.email },
    });

    setClientSecret(session.data.client_secret);
  };
  useEffect(() => {
    createSession();
  }, []);

  return <EmbeddedCheckoutComponent clientSecret={clientSecret} />;
};

const EmbeddedCheckoutComponent = ({ clientSecret }: CheckoutPageProps) => {
  const options = {
    clientSecret,
  };

  return (
    <EmbeddedCheckoutProvider stripe={stripe} options={options}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
};

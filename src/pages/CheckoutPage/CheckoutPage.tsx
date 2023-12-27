import { useEffect, useState } from 'react';
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

  const createSession = async () => {
    const session = await axios({
      method: 'POST',
      url: 'http://localhost:3000/dev/stripe/checkout/session',
      headers: { 'Content-Type': 'application/json' },
      data: { priceId: 'price_1OPun0CUs9Oi5yjKifQTQuE2' },
    });

    setClientSecret(session.data.client_secret);
  };
  useEffect(() => {
    createSession();
  }, []);

  return (
    <>
      <h1>Checkout</h1>
      {clientSecret && (
        <EmbeddedCheckoutComponent clientSecret={clientSecret} />
      )}
    </>
  );
};

const EmbeddedCheckoutComponent = ({ clientSecret }: CheckoutPageProps) => {
  const options = {
    clientSecret,
  };

  console.log(options);

  return (
    <EmbeddedCheckoutProvider stripe={stripe} options={options}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
};

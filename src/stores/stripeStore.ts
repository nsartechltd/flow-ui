import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type StripeSession = {
  status: string;
  paymentStatus: string;
  customerEmail: string;
};

interface StripeState {
  status: string;
  paymentStatus: string;
  customerEmail: string;
  isSubscribed: boolean;
}

interface StripeActions {
  setDetails: (details: {
    status: string;
    paymentStatus: string;
    customerEmail: string;
    isSubscribed: boolean;
  }) => void;
}

export const useStripeStore = create<StripeState & StripeActions>()(
  devtools(
    persist(
      (set) => ({
        status: '',
        paymentStatus: '',
        customerEmail: '',
        isSubscribed: false,
        setDetails: ({ status, paymentStatus, customerEmail, isSubscribed }) =>
          set(() => ({ status, paymentStatus, customerEmail, isSubscribed })),
      }),
      { name: 'stripe' }
    )
  )
);

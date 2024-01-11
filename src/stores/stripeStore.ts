import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import axios, { AxiosResponse } from 'axios';

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
  getSession: (sessionId: string) => Promise<void>;
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_FLOW_API_URL,
});

export const useStripeStore = create<StripeState & StripeActions>()(
  devtools(
    persist(
      (set) => ({
        status: '',
        paymentStatus: '',
        customerEmail: '',
        isSubscribed: false,
        getSession: async (sessionId) => {
          const session: AxiosResponse<StripeSession> = await axiosInstance.get(
            `/stripe/session/${sessionId}`
          );

          const data = session.data;

          set({ ...data, isSubscribed: true });
        },
      }),
      { name: 'stripe' }
    )
  )
);

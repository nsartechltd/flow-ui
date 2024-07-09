import { GetStripeSession } from './types';
import { apiUrls } from '@utils/urls';

import axios from 'axios';

const fetchers = {
  // Stripe
  GET_STRIPE_SESSION: ({
    queryKey,
  }: {
    queryKey: string[];
  }): Promise<GetStripeSession> =>
    axios({
      url: `${import.meta.env.VITE_FLOW_API_URL}/${apiUrls.getStripeSession(
        queryKey[1]
      )}`,
    }),
};

export const queries = {
  // Stripe
  GET_STRIPE_SESSION: {
    queryKey: ['GET_STRIPE_SESSION'],
    queryFn: fetchers.GET_STRIPE_SESSION,
  },
};

export const apiUrls = {
  // Stripe
  getStripeSession: (sessionId: string) => `stripe/session/${sessionId}`,
  createStripeSession: `stripe/session`,

  // Users
  createUser: `users`,
};

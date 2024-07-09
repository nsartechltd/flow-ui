export interface ApiError {
  error: string;
}

// Stripe
export interface GetStripeSession {
  status: string;
  paymentStatus: string;
  customerEmail: string;
}

// Users
export interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  organisation: string;
  birthdate: string;
  cognitoId?: string;
}

export interface CreateUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthdate: string;
  cognitoId: string | string;
  organisationId: string;
  organisation: {
    id: string;
    name: string;
    stripeSubscriptionId: string | null;
    vatRegistrationNumber: string | null;
  };
}

import { useMutation, useQuery } from '@tanstack/react-query';

import { queries } from './queries';
import { mutations } from './mutations';
import {
  ApiError,
  CreateUserData,
  CreateUserResponse,
  GetStripeSession,
} from './types';

// Stripe
export const useGetStripeSessionQuery = (sessionId: string) =>
  useQuery<GetStripeSession, ApiError, GetStripeSession, string[]>({
    queryKey: [queries.GET_STRIPE_SESSION.queryKey[0], sessionId],
    queryFn: queries.GET_STRIPE_SESSION.queryFn,
    enabled: Boolean(sessionId),
  });

// Users
export const useCreateUserMutation = (options?: {
  onSuccess: (data: CreateUserResponse) => void;
}) =>
  useMutation<CreateUserResponse, ApiError, CreateUserData>({
    mutationFn: mutations.CREATE_USER.mutationFn,
    ...(options && options),
  });

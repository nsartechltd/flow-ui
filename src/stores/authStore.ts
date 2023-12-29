import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';

import userPool from '@utils/userPool';

interface AuthState {
  isAuthenticated: boolean;
  newPasswordRequired?: boolean;
  authError?: string;
  cognitoUser?: CognitoUser;
  isConfirmed: boolean;
}

interface SignUpUser {
  firstName: string;
  lastName: string;
  email: string;
  birthdate: string;
  organisation: string;
  password: string;
}

interface AuthActions {
  getUser: (email: string) => CognitoUser;
  authenticate: (email: string, password: string) => void;
  resetPassword: (newPassword: string) => void;
  signUp: (user: SignUpUser) => void;
  verifyAccount: (code: string) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set, get) => ({
        isAuthenticated: false,
        newPasswordRequired: false,
        authError: undefined,
        isConfirmed: false,
        getUser: (email) => {
          return new CognitoUser({
            Username: email,
            Pool: userPool(),
          });
        },
        authenticate: (email, password) => {
          const user = get().getUser(email);

          const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
          });

          user.authenticateUser(authDetails, {
            onSuccess: () => set({ isAuthenticated: true }),
            onFailure: (err) => set({ authError: err.message }),
            newPasswordRequired: () =>
              set({
                newPasswordRequired: true,
                cognitoUser: user,
              }),
          });
        },
        verifyAccount: (code) => {
          const cognitoUser = get().cognitoUser;

          cognitoUser?.confirmRegistration(code, true, (err, result) => {
            if (err) {
              set({ authError: err.message });
              return;
            }

            set({ isConfirmed: true });
            return result;
          });
        },
        resetPassword: (newPassword) => {
          const user = get().cognitoUser;
          if (!user) {
            console.log('A user is required to reset your password');
            return;
          }

          user.completeNewPasswordChallenge(
            newPassword,
            {},
            {
              onSuccess: () =>
                set({ isAuthenticated: true, newPasswordRequired: false }),
              onFailure: (err) =>
                console.error('completeNewPasswordChallenge onFailure', err),
            }
          );
        },
        signUp: (user) => {
          const userAttributes = [
            new CognitoUserAttribute({
              Name: 'birthdate',
              Value: user.birthdate,
            }),
            new CognitoUserAttribute({
              Name: 'custom:organisation',
              Value: user.organisation,
            }),
            new CognitoUserAttribute({
              Name: 'given_name',
              Value: user.firstName,
            }),
            new CognitoUserAttribute({
              Name: 'family_name',
              Value: user.lastName,
            }),
            new CognitoUserAttribute({
              Name: 'email',
              Value: user.email,
            }),
          ];

          return userPool().signUp(
            user.email,
            user.password,
            userAttributes,
            userAttributes,
            (err, result) => {
              if (err) {
                set({ authError: err.message });
                return;
              }

              set({
                isAuthenticated: true,
                cognitoUser: result?.user,
                isConfirmed: false,
              });
              return result?.user;
            }
          );
        },
      }),
      { name: 'auth' }
    )
  )
);

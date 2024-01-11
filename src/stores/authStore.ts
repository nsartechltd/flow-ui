import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
  CognitoUserSession,
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
  setAuthState: (authState: {
    idToken?: string;
    accessToken?: string;
    refreshToken?: string;
    email?: string;
    isAuthenticated?: boolean;
    authError?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    forgotPasswordSuccess?: boolean;
  }) => void;
  getAuthState: (userSession: CognitoUserSession) => {
    username: string;
    idToken: string;
    accessToken: string;
    refreshToken: string;
    email: string;
    isAdmin: boolean;
    firstName: string;
    lastName: string;
  };
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
            onSuccess: (userSession) => {
              console.log('onSuccess', userSession);
              const {
                username,
                idToken,
                accessToken,
                refreshToken,
                email,
                firstName,
                lastName,
              } = get().getAuthState(userSession);

              get().setAuthState({
                username,
                idToken,
                accessToken,
                refreshToken,
                email,
                isAuthenticated: true,
                firstName,
                lastName,
              });
            },
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
        getAuthState: (userSession: CognitoUserSession) => {
          const idToken = userSession.getIdToken().getJwtToken();
          const accessToken = userSession.getAccessToken().getJwtToken();
          const refreshToken = userSession.getRefreshToken().getToken();
          const idTokenPayload = userSession.getIdToken().payload;
          const {
            email,
            ['custom:isAdmin']: isAdmin,
            given_name: firstName,
            family_name: lastName,
            sub: username,
          } = idTokenPayload;

          return {
            username,
            idToken,
            accessToken,
            refreshToken,
            email: email as string,
            isAdmin: Boolean(isAdmin),
            firstName,
            lastName,
          };
        },
        setAuthState: (authState) => set(authState),
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

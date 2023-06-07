import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

import userPool from "@utils/userPool";

interface AuthState {
  isAuthenticated: boolean;
  newPasswordRequired?: boolean;
  authError?: string;
}

interface AuthActions {
  getUser: (email: string) => CognitoUser;
  authenticate: (email: string, password: string) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set, get) => ({
        isAuthenticated: false,
        newPasswordRequired: false,
        authError: undefined,
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
            onSuccess: () => {
              set({ isAuthenticated: true });
            },
            onFailure: (err) => set({ authError: err.message }),
            newPasswordRequired: () => set({ newPasswordRequired: true }),
          });
        },
      }),
      { name: "auth" }
    )
  )
);

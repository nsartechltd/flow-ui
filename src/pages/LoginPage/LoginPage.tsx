import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from 'amazon-cognito-identity-js';
import { useNavigate } from "react-router-dom";

import { TextField } from "@components/TextField";

export const LoginPage = () => {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<{email: string, password: string}> = ({ email, password }) => {
    const userPool = new CognitoUserPool({
      UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
    });
    const user = new CognitoUser({ Username: email, Pool: userPool });
    const authenticationDetails = new AuthenticationDetails({ Username: email, Password: password });

    user.authenticateUser(authenticationDetails, {
      onSuccess: (cb) => {
        console.log(cb);
        return navigate('/dashboard');
      },
      onFailure: (err) => console.log(err),
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        console.log(userAttributes, requiredAttributes);
      }
    })
  };

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Controller
        name="email"
        control={control}
        rules={{ required: true }}
        defaultValue={""}
        render={({ field, fieldState }) =>
          <TextField
              id="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              error={fieldState.error}
              {...field}
            />
        }
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        defaultValue={""}
        render={({ field, fieldState }) =>
            <TextField
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              error={fieldState.error}
              {...field}
            />
        }
      />
      <input type="submit" value="Sign in" />
    </form>
  );
};

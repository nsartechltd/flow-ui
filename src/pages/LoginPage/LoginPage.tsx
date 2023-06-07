import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { TextField } from "@components/TextField";
import { useAuthStore } from "@stores/authStore";

type FormValues = {
  email: string;
  password: string;
};

export const LoginPage = () => {
  const { control, handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();
  const { isAuthenticated, authenticate, newPasswordRequired, authError } = useAuthStore();

  const onSubmit: SubmitHandler<FormValues> = ({ email, password }) => authenticate(email, password);

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
    if (newPasswordRequired) navigate("/reset-password");
  }, [isAuthenticated, newPasswordRequired, navigate])

  return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col grow h-14">
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            defaultValue={""}
            render={({ field, fieldState }) => (
              <TextField
                id="email"
                label="Email Address"
                type="email"
                placeholder="Enter your email address"
                error={fieldState.error}
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            defaultValue={""}
            render={({ field, fieldState }) => (
              <TextField
                id="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                error={fieldState.error}
                {...field}
              />
            )}
          />
          <button type="submit" className="primary">
            Sign in
          </button>
          {authError && <div className="text-red">{authError}</div>}
        </div>
      </form>
  );
};

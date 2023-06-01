import { forwardRef } from "react";
import { FieldError } from "react-hook-form";

export type TextFieldProps = {
  id: string;
  testId?: string;
  label?: string;
  type?: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: FieldError;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ id, label, name, placeholder, type, error, onChange, ...props }, ref) => {
    return (
      <div>
        <label htmlFor={name}>
          {label}
        </label>
          <input
            ref={ref}
            id={id}
            type={type}
            className="block w-full appearance-none text-base rounded-lg border px-3 py-3 bg-transparent focus:outline-none"
            name={name}
            required
            placeholder={placeholder}
            onChange={onChange}
            {...props}
          />
          {error && error.type === 'required' && <div className="form-field-error">Field is required</div>}
      </div>
    );
  }
);

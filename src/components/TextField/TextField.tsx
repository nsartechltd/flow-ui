import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

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
      <div className="flex flex-col p-2">
        <label htmlFor={name}>{label}</label>
        <input
          ref={ref}
          id={id}
          type={type}
          className="rounded-lg"
          name={name}
          required
          placeholder={placeholder}
          onChange={onChange}
          {...props}
        />
        {error && error.type === 'required' && (
          <div className="form-field-error text-red">Field is required</div>
        )}
      </div>
    );
  }
);

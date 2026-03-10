import type { InputHTMLAttributes } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label?: string;
  error?: string;
  helpText?: string;
};

export default function Input({
  label,
  type = 'text',
  error,
  helpText,
  id,
  className = '',
  disabled,
  ...props
}: InputProps) {
  const describedBy = error ? `${id}-error` : helpText ? `${id}-help` : undefined;

  return (
    <div className="space-y-1">
      {label ? (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      ) : null}

      <input
        id={id}
        type={type}
        className={`w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 dark:text-gray-100 ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-green-600 dark:border-gray-600'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white dark:bg-gray-800'} ${className}`}
        aria-describedby={describedBy}
        aria-invalid={Boolean(error)}
        disabled={disabled}
        {...props}
      />

      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      ) : helpText ? (
        <p id={`${id}-help`} className="text-sm text-gray-500 dark:text-gray-400">
          {helpText}
        </p>
      ) : null}
    </div>
  );
}


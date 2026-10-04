import React from 'react';
import styles from './Input.module.scss';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  wrapperClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      prefixIcon,
      suffixIcon,
      id,
      className = '',
      wrapperClassName = '',
      disabled,
      required,
      ...rest
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className={`${styles.wrapper} ${wrapperClassName}`}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required && <span className={styles.requiredStar} aria-hidden="true">*</span>}
          </label>
        )}

        <div
          className={[
            styles.inputContainer,
            error ? styles.hasError : '',
            disabled ? styles.disabled : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {prefixIcon && <span className={styles.prefix}>{prefixIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            className={`${styles.input} ${className}`}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...rest}
          />
          {suffixIcon && <span className={styles.suffix}>{suffixIcon}</span>}
        </div>

        {error ? (
          <span id={`${inputId}-error`} className={styles.error} role="alert">
            {error}
          </span>
        ) : helperText ? (
          <span id={`${inputId}-helper`} className={styles.helper}>
            {helperText}
          </span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

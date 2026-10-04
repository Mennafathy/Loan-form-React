import React from 'react';
import styles from './Spinner.module.scss';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'accent';
  className?: string;
  label?: string;
}

export function Spinner({
  size = 'md',
  color = 'primary',
  className = '',
  label = 'Loading...',
}: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={[styles.wrapper, styles[size], styles[color], className]
        .filter(Boolean)
        .join(' ')}
    >
      <svg className={styles.spinnerSvg} viewBox="0 0 50 50">
        <circle
          className={styles.path}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
        />
      </svg>
      <span className={styles.srOnly}>{label}</span>
    </div>
  );
}

import React from 'react';
import styles from './Card.module.scss';

export interface CardProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
  children,
  title,
  subtitle,
  action,
  footer,
  className = '',
  variant = 'default',
  padding = 'md',
}: CardProps) {
  const hasHeader = title || subtitle || action;

  return (
    <div
      className={[
        styles.card,
        styles[variant],
        styles[`padding-${padding}`],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {hasHeader && (
        <header className={styles.header}>
          <div className={styles.titles}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {action && <div className={styles.action}>{action}</div>}
        </header>
      )}

      <div className={styles.body}>{children}</div>

      {footer && <footer className={styles.footer}>{footer}</footer>}
    </div>
  );
}

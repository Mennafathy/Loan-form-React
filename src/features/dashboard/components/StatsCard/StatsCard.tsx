import React from 'react';
import styles from './StatsCard.module.scss';
import { Card } from '@/components/ui/Card';

export interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: string;
  isPositive?: boolean;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  isPositive = true,
}: StatsCardProps) {
  return (
    <Card variant="glass" className={styles.statsCard} padding="md">
      <div className={styles.topRow}>
        <span className={styles.title}>{title}</span>
        {icon && <div className={styles.iconCircle}>{icon}</div>}
      </div>

      <div className={styles.valueRow}>
        <span className={styles.value}>{value}</span>
      </div>

      {(trend || subtitle) && (
        <div className={styles.footerRow}>
          {trend && (
            <span className={`${styles.trend} ${isPositive ? styles.positive : styles.negative}`}>
              {trend}
            </span>
          )}
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        </div>
      )}
    </Card>
  );
}

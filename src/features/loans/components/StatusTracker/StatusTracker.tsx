import React from 'react';
import styles from './StatusTracker.module.scss';
import { ApplicationTimelineEvent, ApplicationStatus } from '../../models/loan';
import { formatDate } from '@/utils/date';
import { Check, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

export interface StatusTrackerProps {
  status: ApplicationStatus;
  timeline: ApplicationTimelineEvent[];
}

export function StatusTracker({ status, timeline }: StatusTrackerProps) {
  const getStatusBadge = () => {
    switch (status) {
      case 'approved':
        return (
          <span className={`${styles.badge} ${styles.badgeApproved}`}>
            <CheckCircle2 size={14} /> Approved
          </span>
        );
      case 'under_review':
        return (
          <span className={`${styles.badge} ${styles.badgeReview}`}>
            <Clock size={14} /> Under Review
          </span>
        );
      case 'action_required':
        return (
          <span className={`${styles.badge} ${styles.badgeAction}`}>
            <AlertCircle size={14} /> Action Required
          </span>
        );
      case 'funded':
        return (
          <span className={`${styles.badge} ${styles.badgeFunded}`}>
            <Check size={14} /> Funded
          </span>
        );
      default:
        return (
          <span className={`${styles.badge} ${styles.badgeSubmitted}`}>
            <Clock size={14} /> Processing
          </span>
        );
    }
  };

  return (
    <div className={styles.trackerWrapper}>
      <div className={styles.header}>
        <h4 className={styles.title}>Application Progress</h4>
        {getStatusBadge()}
      </div>

      <div className={styles.timelineList}>
        {timeline.map((event, index) => {
          const isCurrent = !event.completed && (index === 0 || timeline[index - 1]?.completed);

          return (
            <div
              key={index}
              className={[
                styles.timelineItem,
                event.completed ? styles.completed : '',
                isCurrent ? styles.current : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <div className={styles.nodeWrapper}>
                <div className={styles.nodeCircle}>
                  {event.completed ? <Check size={14} /> : <span className={styles.innerDot} />}
                </div>
                {index < timeline.length - 1 && <div className={styles.nodeLine} />}
              </div>

              <div className={styles.content}>
                <div className={styles.eventHeader}>
                  <h5 className={styles.eventTitle}>{event.title}</h5>
                  <span className={styles.eventTime}>{formatDate(event.timestamp)}</span>
                </div>
                <p className={styles.eventDesc}>{event.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

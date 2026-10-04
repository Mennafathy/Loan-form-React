import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, PlusCircle, LayoutDashboard, FileText, User } from 'lucide-react';

export interface HeaderProps {
  appName?: string;
  userName?: string;
}

export function Header({ appName = 'LoanFlow', userName }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.brand}>
          <div className={styles.logoIcon}>
            <ShieldCheck size={24} />
          </div>
          <span className={styles.brandName}>
            {appName}<span className={styles.brandDot}>.</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Main Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/apply"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <FileText size={18} />
            <span>Apply Now</span>
          </NavLink>
        </nav>

        <div className={styles.actions}>
          <Link to="/apply">
            <Button
              variant="primary"
              size="sm"
              icon={<PlusCircle size={16} />}
            >
              New Loan
            </Button>
          </Link>

          <div className={styles.userProfile}>
            <div className={styles.avatar}>
              <User size={16} />
            </div>
            <span className={styles.userName}>{userName || 'Guest User'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

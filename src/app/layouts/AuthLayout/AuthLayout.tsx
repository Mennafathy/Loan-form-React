import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.scss';

export function AuthLayout() {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

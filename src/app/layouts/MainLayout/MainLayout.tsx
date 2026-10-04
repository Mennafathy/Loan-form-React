import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { useAuth } from '@/features/auth/hooks/useAuth';

export function MainLayout() {
  const { user } = useAuth();

  return (
    <div className={styles.layout}>
      <Header appName="LoanFlow" userName={user?.name} />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

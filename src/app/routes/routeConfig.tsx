import React from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { dashboardRoutes } from '@/features/dashboard/dashboard.routes';
import { loanRoutes } from '@/features/loans/loans.routes';
import { authRoutes } from '@/features/auth/auth.routes';

export const routeConfig: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      ...dashboardRoutes,
      ...loanRoutes,
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      ...authRoutes,
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

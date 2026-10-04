import { RouteObject } from 'react-router-dom';
import { ApplyPage } from './pages/ApplyPage';
import { LoanDetailsPage } from './pages/LoanDetailsPage';

export const loanRoutes: RouteObject[] = [
  {
    path: '/apply',
    element: <ApplyPage />,
  },
  {
    path: '/loans/:id',
    element: <LoanDetailsPage />,
  },
];

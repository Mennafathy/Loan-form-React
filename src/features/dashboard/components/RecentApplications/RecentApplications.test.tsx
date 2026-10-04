import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { RecentApplications } from './RecentApplications';
import { loanService } from '@/features/loans/services/loanService';

describe('RecentApplications', () => {
  it('renders application records in table', () => {
    const apps = loanService.getApplications();
    render(
      <BrowserRouter>
        <RecentApplications applications={apps} />
      </BrowserRouter>
    );

    expect(screen.getByText(/recent loan applications/i)).toBeInTheDocument();
    expect(screen.getByText('#APP-8941')).toBeInTheDocument();
  });
});

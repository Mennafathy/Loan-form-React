import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { LoanDetailsPage } from './LoanDetailsPage';

describe('LoanDetailsPage', () => {
  it('renders application details for valid seeded loan', () => {
    render(
      <MemoryRouter initialEntries={['/loans/APP-8941']}>
        <Routes>
          <Route path="/loans/:id" element={<LoanDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/sarah’s loan application/i)).toBeInTheDocument();
    expect(screen.getByText(/app-8941/i)).toBeInTheDocument();
  });

  it('renders not found state when application does not exist', () => {
    render(
      <MemoryRouter initialEntries={['/loans/UNKNOWN-123']}>
        <Routes>
          <Route path="/loans/:id" element={<LoanDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/application not found/i)).toBeInTheDocument();
  });
});

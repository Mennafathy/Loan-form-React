import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { LoanCalculator } from './LoanCalculator';

describe('LoanCalculator', () => {
  it('renders loan calculator with default amounts and controls', () => {
    render(
      <BrowserRouter>
        <LoanCalculator initialAmount={25000} initialTerm={36} />
      </BrowserRouter>
    );

    expect(screen.getByText(/estimate your monthly rate/i)).toBeInTheDocument();
    expect(screen.getByText(/loan amount/i)).toBeInTheDocument();
    expect(screen.getByText(/repayment term/i)).toBeInTheDocument();
  });
});

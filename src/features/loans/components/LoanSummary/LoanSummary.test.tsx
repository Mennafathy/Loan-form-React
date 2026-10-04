import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoanSummary } from './LoanSummary';

describe('LoanSummary', () => {
  it('renders terms and monthly payment', () => {
    render(
      <LoanSummary
        amount={20000}
        termMonths={36}
        monthlyPayment={608.44}
        interestRate={5.99}
        totalInterest={1903.84}
        originationFee={200}
      />
    );
    expect(screen.getByText(/your customized loan/i)).toBeInTheDocument();
    expect(screen.getByText(/\$608\.44/)).toBeInTheDocument();
    expect(screen.getByText(/\$20,000/)).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { LoanForm } from './LoanForm';

describe('LoanForm', () => {
  it('renders step 1 borrower inputs by default', () => {
    render(
      <BrowserRouter>
        <LoanForm />
      </BrowserRouter>
    );

    expect(screen.getByText(/borrower personal information/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
  });
});

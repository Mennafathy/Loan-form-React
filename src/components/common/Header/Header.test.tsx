import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Header } from './Header';

describe('Header', () => {
  it('renders application branding and links', () => {
    render(
      <BrowserRouter>
        <Header appName="LoanFlow" />
      </BrowserRouter>
    );
    expect(screen.getByText(/loanflow/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /apply now/i })).toBeInTheDocument();
  });
});

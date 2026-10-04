import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders with accessible role status', () => {
    render(<Spinner label="Calculating Rates" />);
    expect(screen.getByRole('status', { name: /calculating rates/i })).toBeInTheDocument();
  });
});

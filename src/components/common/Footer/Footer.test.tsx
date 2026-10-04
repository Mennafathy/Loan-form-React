import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders copyright and brand', () => {
    render(<Footer />);
    expect(screen.getAllByText(/loanflow/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
  });
});

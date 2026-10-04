import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('renders content correctly', () => {
    render(<Card>Card Body Content</Card>);
    expect(screen.getByText('Card Body Content')).toBeInTheDocument();
  });

  it('renders title and subtitle when provided', () => {
    render(<Card title="Loan Overview" subtitle="Current status">Details</Card>);
    expect(screen.getByText('Loan Overview')).toBeInTheDocument();
    expect(screen.getByText('Current status')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatsCard } from './StatsCard';

describe('StatsCard', () => {
  it('renders title, value, and subtitle', () => {
    render(<StatsCard title="Total Funded" value="$125,000" subtitle="Across all loans" />);
    expect(screen.getByText('Total Funded')).toBeInTheDocument();
    expect(screen.getByText('$125,000')).toBeInTheDocument();
    expect(screen.getByText('Across all loans')).toBeInTheDocument();
  });
});

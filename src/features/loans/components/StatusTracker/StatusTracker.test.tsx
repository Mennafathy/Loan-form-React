import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatusTracker } from './StatusTracker';

describe('StatusTracker', () => {
  it('renders application progress timeline', () => {
    const timeline = [
      {
        title: 'Application Submitted',
        description: 'Completed form',
        timestamp: new Date().toISOString(),
        completed: true,
      },
    ];

    render(<StatusTracker status="approved" timeline={timeline} />);
    expect(screen.getByText(/application progress/i)).toBeInTheDocument();
    expect(screen.getByText('Application Submitted')).toBeInTheDocument();
    expect(screen.getByText('Approved')).toBeInTheDocument();
  });
});

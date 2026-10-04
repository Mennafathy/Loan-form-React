import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { App } from './App';

describe('App Root', () => {
  it('renders application navigation and dashboard', () => {
    render(<App />);
    expect(screen.getAllByText(/dashboard/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/apply/i).length).toBeGreaterThan(0);
  });
});

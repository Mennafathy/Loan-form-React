import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders with label and connects label with input id', () => {
    render(<Input label="Annual Income" id="income" />);
    expect(screen.getByLabelText(/annual income/i)).toBeInTheDocument();
  });

  it('displays error message and sets aria-invalid', () => {
    render(<Input label="Email" error="Invalid email address" />);
    const input = screen.getByLabelText(/email/i);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid email address');
  });

  it('captures text changes', () => {
    const handleChange = vi.fn();
    render(<Input label="Full Name" onChange={handleChange} />);
    const input = screen.getByLabelText(/full name/i);
    fireEvent.change(input, { target: { value: 'Jane Doe' } });
    expect(handleChange).toHaveBeenCalled();
  });
});

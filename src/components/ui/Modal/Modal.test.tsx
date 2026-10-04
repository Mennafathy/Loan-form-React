import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from './Modal';

describe('Modal', () => {
  it('does not render when isOpen is false', () => {
    render(<Modal isOpen={false} onClose={vi.fn()} title="Title">Content</Modal>);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders title and content when isOpen is true', () => {
    render(<Modal isOpen={true} onClose={vi.fn()} title="Loan Terms">Terms Agreement</Modal>);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Loan Terms')).toBeInTheDocument();
    expect(screen.getByText('Terms Agreement')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const handleClose = vi.fn();
    render(<Modal isOpen={true} onClose={handleClose} title="Loan Terms">Content</Modal>);
    fireEvent.click(screen.getByLabelText(/close dialog/i));
    expect(handleClose).toHaveBeenCalled();
  });
});

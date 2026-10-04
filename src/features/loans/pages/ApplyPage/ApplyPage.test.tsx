import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { ApplyPage } from './ApplyPage';

describe('ApplyPage', () => {
  it('renders application heading and form', () => {
    render(
      <BrowserRouter>
        <ApplyPage />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /apply for your personal loan/i })).toBeInTheDocument();
  });
});

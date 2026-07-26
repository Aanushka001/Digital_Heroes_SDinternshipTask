import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';

import App from '../src/App.jsx';
import { auditUrl } from '../src/services/api.js';

vi.mock('../src/services/api.js', () => ({
  auditUrl: vi.fn(),
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('App', () => {
  beforeEach(() => {
    auditUrl.mockReset();
  });

  it('shows a message instead of doing nothing when submitted empty', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /analyse/i }));
    expect(screen.getByText(/please enter a url/i)).toBeInTheDocument();
  });

  it('renders the report card on a successful audit', async () => {
    auditUrl.mockResolvedValue({
      url: 'https://example.com',
      httpStatus: 200,
      responseTimeMs: 150,
      pageTitle: 'Example Domain',
      metaDescription: '',
      h1Count: 1,
      imagesMissingAlt: 0,
      wordCount: 17,
    });

    render(<App />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'https://example.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /analyse/i }));

    await waitFor(() =>
      expect(screen.getByText('Example Domain')).toBeInTheDocument()
    );

    expect(screen.getByText('200')).toBeInTheDocument();
  });

  it('shows the backend error message when the audit fails', async () => {
    auditUrl.mockRejectedValue(new Error('Could not reach "bad.example".'));

    render(<App />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'https://bad.example' },
    });

    fireEvent.click(screen.getByRole('button', { name: /analyse/i }));

    await waitFor(() =>
      expect(screen.getByText(/could not reach/i)).toBeInTheDocument()
    );
  });
});
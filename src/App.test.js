import { render, screen } from '@testing-library/react';
import App from './App';

test('renders homepage', () => {
  render(<App />);
  const homeTitle = screen.getByText(/fake kickball league/i);
  expect(homeTitle).toBeInTheDocument();
});

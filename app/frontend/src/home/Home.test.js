import { render, screen } from '@testing-library/react';
import Home from './Home';

// example test to be changed
test('renders home paragraph', () => {
  render(<Home />);
  const linkElement = screen.getByText(/home/i);
  expect(linkElement).toBeInTheDocument();
});

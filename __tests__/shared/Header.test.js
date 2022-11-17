import Header from 'shared/Header';
import { render } from '@testing-library/react-native';

test('renders the Header', () => {
  const headerTree = render(<Header />).toJSON();
  expect(headerTree).toMatchSnapshot();
});

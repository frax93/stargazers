import UserList from 'components/UserList';
import { render } from '@testing-library/react-native';

const setup = (props = {}) => {
  const wrapper = render(<UserList {...props} />);
  return wrapper;
};

describe('Testing user list component', () => {
  it("renders without errors", () => {
    const userListComponent = setup();

    const componentToJSON = userListComponent.toJSON();

    expect(componentToJSON).toMatchSnapshot();
  });

  it("renders no element found", () => {
    const userListComponent = setup({
      data: []
    });

    const noTextElement = userListComponent.getByTestId('no-element');

    expect(noTextElement.children[0]).toBe('No element found');
  });

  it("renders an element found", () => {
    const data = [{
      avatar_url: 'avatar',
      login: 'username',
    }];

    const userListComponent = setup({
      data
    });

    const imageItems = userListComponent.getAllByTestId('image-item');
    const avatarItems = userListComponent.getAllByTestId('avatar-item');

    const [firstImageItem] = imageItems || [];
    const [firstAvatarItem] = avatarItems || [];

    expect(firstImageItem.props.source).toHaveProperty('uri', 'avatar');

    expect(firstAvatarItem.children[0]).toBe('username');
  });
});


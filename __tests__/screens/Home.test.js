import Home from 'screens/Home';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { mockStargazers } from '../../mocks/stargazers';

const setup = () => {
  const wrapper = render(<Home />);
  return wrapper;
};


global.fetch = jest.fn((url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(url.includes('burzaszsolt')) {

        resolve({
          json: () => Promise.resolve(mockStargazers),
          status: 200
        });
        return;
      }

      reject({ status: 404 });
    }, 3000);

  });
}
);

describe('Testing home screen', () => {
  it("renders without errors", () => {
    const homeScreenComponent = setup();

    const componentToJSON = homeScreenComponent.toJSON();

    expect(componentToJSON).toMatchSnapshot();
  });

  it("does not show validation errors", async () => {
    const { getByTestId, queryAllByText } = setup();


    const repositoryInput = getByTestId('repository');
    const ownerInput = getByTestId('owner');
    const submitButton = getByTestId('submit');

    await waitFor(() => {
      fireEvent.changeText(repositoryInput, 'repository');
    });

    await waitFor(() => {
      fireEvent.changeText(ownerInput, 'burzaszsolt');
    });

    await waitFor(() => {
      fireEvent.press(submitButton);
    });

    await waitFor(() => {
      expect(queryAllByText('Field required')).toHaveLength(0);
    }, { timeout: 4000 });

  });

  it("is loading spinner is present", async () => {
    const { getByTestId, findByText } = setup();


    const repositoryInput = getByTestId('repository');
    const ownerInput = getByTestId('owner');
    const submitButton = getByTestId('submit');

    await waitFor(() => {
      fireEvent.changeText(repositoryInput, 'repository');
    });

    await waitFor(() => {
      fireEvent.changeText(ownerInput, 'burzaszsolt');
    });

    await waitFor(() => {
      fireEvent.press(submitButton);
    });

    expect((await (await findByText('Loading...', {}, { timeout: 100 })).children[0].children[0])).toBe('Loading...');

  });

  it("fetch is ok", async () => {
    const { getByTestId, getAllByTestId } = setup();


    const repositoryInput = getByTestId('repository');
    const ownerInput = getByTestId('owner');
    const submitButton = getByTestId('submit');

    await waitFor(() => {
      fireEvent.changeText(repositoryInput, 'repository');
    });

    await waitFor(() => {
      fireEvent.changeText(ownerInput, 'burzaszsolt');
    });

    await waitFor(() => {
      fireEvent.press(submitButton);
    });


    await waitFor(() => {
      const imageItems = getAllByTestId('image-item');
      const avatarItems = getAllByTestId('avatar-item');

      const [firstImageItem] = imageItems || [];
      const [firstAvatarItem] = avatarItems || [];

      expect(firstImageItem.props.source).toHaveProperty('uri', 'https://avatars.githubusercontent.com/u/57904449?v=4');

      expect(firstAvatarItem.children[0]).toBe('alekseiOdegovC');
    }, { timeout: 4000 });

  });

  it("fetch is ko", async () => {
    const { getByTestId, queryAllByText } = setup();


    const repositoryInput = getByTestId('repository');
    const ownerInput = getByTestId('owner');
    const submitButton = getByTestId('submit');

    await waitFor(() => {
      fireEvent.changeText(repositoryInput, 'repository');
    });

    await waitFor(() => {
      fireEvent.changeText(ownerInput, 'owner');
    });

    await waitFor(() => {
      fireEvent.press(submitButton);
    });


    await waitFor(() => {
      const noTextElement = getByTestId('no-element');

      expect(noTextElement.children[0]).toBe('No element found');
      expect(queryAllByText('Error during search')).not.toBe(null);
    }, { timeout: 4000 });

  });


  it("Reset search form", async () => {
    const { getByTestId } = setup();

    const repositoryInput = getByTestId('repository');
    const ownerInput = getByTestId('owner');

    await waitFor(() => {
      fireEvent.changeText(repositoryInput, 'repository');
    });

    await waitFor(() => {
      fireEvent.changeText(ownerInput, 'owner');
    });

    await waitFor(() => {
      expect(getByTestId('repository').props.value).toBe('repository');
      expect(getByTestId('owner').props.value).toBe('owner');
    });

    const resetButton = getByTestId('reset');

    await waitFor(() => {
      fireEvent.press(resetButton);
    });

    await waitFor(() => {
      expect(getByTestId('repository').props.value).toBe('');
      expect(getByTestId('owner').props.value).toBe('');
    });

  });

  it("Show validation search errors", async () => {
    const { getByTestId, queryAllByText } = setup();

    const submitButton = getByTestId('submit');

    await waitFor(() => {
      fireEvent.press(submitButton);
    });

    await waitFor(() => {
      expect(queryAllByText('Field required')).toHaveLength(2);
    });

  });
});


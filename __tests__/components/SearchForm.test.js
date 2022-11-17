import SearchForm from 'components/SearchForm';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

const setup = (props = {}) => {
  const wrapper = render(<SearchForm {...props} />);
  return wrapper;
};

describe('Testing search form component', () => {
  it("renders without errors", () => {
    const formComponent = setup();

    const componentToJSON = formComponent.toJSON();

    expect(componentToJSON).toMatchSnapshot();
  });
  
  it("Have changed props for search", async () => {
    const repository = 'repo';

    const owner = 'user';

    const onChange = jest.fn();
    
    const formComponent = setup({
      onChange,
    });
    
    fireEvent.changeText(formComponent.getByTestId('repository'), repository);
    fireEvent.changeText(formComponent.getByTestId('owner'), owner);

    await waitFor(() => {
      expect(onChange).toBeCalledWith('repository', repository);
      expect(onChange).toBeCalledWith('owner', owner);
    });
   
  });

  it("Display errors", async () => {
    const fieldRequiredMessage = 'field Required';

    const errors = {
      repository: fieldRequiredMessage,
      owner: fieldRequiredMessage,
    };

    const touched = {
      repository: true,
      owner: true,
    };
    
    const formComponent = setup({
      errors,
      touched,
    });

    const repositoryErrorComponent = formComponent.getByTestId('error-repository');
    const ownerErrorComponent = formComponent.getByTestId('error-owner');

    expect(repositoryErrorComponent.children[0]).toBe(fieldRequiredMessage);
    expect(ownerErrorComponent.children[0]).toBe(fieldRequiredMessage);
  });

  it("on Submit", async () => {
    const handleSubmit = jest.fn();

    const repository = 'repo';

    const owner = 'user';

    const values = {
      repository,
      owner
    };

    const onChange = jest.fn();
    
    const formComponent = setup({
      handleSubmit,
      onChange,
      values
    });
    
    fireEvent.changeText(formComponent.getByTestId('repository'), repository);
    fireEvent.changeText(formComponent.getByTestId('owner'), owner);

    fireEvent.press(formComponent.getByTestId('submit'));
    
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toBeCalledWith({
        repository,
        owner,
      });
    });
  });

  it("on Reset", async () => {
    const handleReset = jest.fn();
    
    const formComponent = setup({
      handleReset,
    });
    
    fireEvent.press(formComponent.getByTestId('reset'));
    
    await waitFor(() => {
      expect(handleReset).toHaveBeenCalledTimes(1);
      expect(handleReset).toBeCalledWith();
    });
  });
});


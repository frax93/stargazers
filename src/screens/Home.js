import { View, StyleSheet, Alert } from 'react-native';
import { useState, useCallback } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Spinner from 'react-native-loading-spinner-overlay';
import SearchForm from '../components/SearchForm.js';
import UserList from '../components/UserList.js';

const initialValues = {
  repository: '',
  owner: '',
  stargazersList: null,
};

const validationSchema = yup.object().shape({
  owner: yup.string().required('Field required'),
  repository: yup.string().required('Field required'),
});

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (values, context) => {
      setIsLoading(true);
      try {
        const res = await fetch(`https://api.github.com/repos/${values.owner}/${values.repository}/stargazers`
        );
        if (res.status !== 200) {
          throw new Error('Error');
        }
        const stargazers = await res.json();
        context.setFieldValue('stargazersList', stargazers);
      } catch (e) {
        console.log(e);
        Alert.alert(
          "Error during search"
        );
        context.setFieldValue('stargazersList', []);
      }
      finally {
        setIsLoading(false);
      }
    }, [setIsLoading]);

  const formikContext = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <View style={styles.container}>
      {isLoading ? <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      /> : undefined}
      <SearchForm values={formikContext.values} errors={formikContext.errors} touched={formikContext.touched} handleSubmit={formikContext.handleSubmit} onChange={formikContext.setFieldValue} handleReset={formikContext.handleReset} />
      <UserList data={formikContext.values.stargazersList} />
    </View>
  );
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  title: {
    margin: 24,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

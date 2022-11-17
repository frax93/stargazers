import { TextInput, View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';


export default function SearchForm({
  errors = {},
  values = {},
  touched = {},
  handleSubmit = () => {},
  onChange = () => {},
  handleReset = () => {}
}) {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Enter repository"
        value={values.repository || ''}
        onChangeText={(text) => onChange('repository', text)}
        testID="repository"
        nativeID="repository"
      />
      {touched.repository && errors.repository ? (
        <Text style={styles.error} testID="error-repository">{errors.repository}</Text>
      ) : null}
      <TextInput
        placeholder="Enter owner"
        style={styles.input}
        value={values.owner || ''}
        onChangeText={(text) => onChange('owner', text)}
        nativeID="owner"
        testID="owner"
      />
      {touched.owner && errors.owner ? (
        <Text style={styles.error} testID="error-owner">{errors.owner}</Text>
      ) : null}
      <Button
        onPress={() => handleSubmit(values)}
        color="black"
        mode="contained"
        testID="submit"
        nativeID="submit"
        style={{ marginTop: 16 }}>
        Submit
      </Button>
      <Button
        onPress={handleReset}
        color="black"
        mode="outlined"
        testID="reset"
        nativeID="reset"
        style={{ marginTop: 16 }}>
        Reset
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    margin: 8,
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    paddingHorizontal: 8,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
});

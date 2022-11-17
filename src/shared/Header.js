import { StyleSheet, Text } from 'react-native';


export default function Header() {
  return (
    <Text style={styles.title}>Stargazers</Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontSize: 22
  },
});

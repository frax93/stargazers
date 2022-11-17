import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from './src/shared/Header';
import HomeScreen from './src/screens/Home';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
<NavigationContainer>
      <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
          headerStyle: {
            backgroundColor: '#127db5',
            display: 'flex',
            justifyContent: 'center'
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerTitle: () => <Header /> }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


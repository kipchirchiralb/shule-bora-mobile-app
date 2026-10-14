import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Import the screens you just created
import WelcomeScreen from "./screens/WelcomeScreen";
import StudentsScreen from "./screens/StudentsScreen";
import SubjectsScreen from "./screens/SubjectsScreen";
// Initialize the Stack Navigator
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ title: "Shule Bora" }}
        />
        <Stack.Screen
          name="Students"
          component={StudentsScreen}
          options={{ title: "Shule Bora Students" }}
        />
        <Stack.Screen
          name="Subjects"
          component={SubjectsScreen}
          options={{ title: "Shule Bora Subjects" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

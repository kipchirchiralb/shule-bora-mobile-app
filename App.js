import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
// Import the screens you just created
import WelcomeScreen from "./screens/WelcomeScreen";
import StudentsScreen from "./screens/StudentsScreen";
import SubjectsScreen from "./screens/SubjectsScreen";
import NewStudentScreen from "./screens/NewStudentScreen";
import NewSubjectScreen from "./screens/NewSubjectScreen";
// Initialize the Stack Navigator
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerStyle: { backgroundColor: "#173B3A" },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: { fontWeight: "700" },
            contentStyle: { backgroundColor: "#F3F7F6" },
          }}
        >
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
            name="NewStudent"
            component={NewStudentScreen}
            options={{ title: "Add Student" }}
          />
          <Stack.Screen
            name="Subjects"
            component={SubjectsScreen}
            options={{ title: "Shule Bora Subjects" }}
          />
          <Stack.Screen
            name="NewSubject"
            component={NewSubjectScreen}
            options={{ title: "Add Subject" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

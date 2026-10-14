import { View, Text, Button, StyleSheet } from "react-native";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Shule Boraaaa</Text>
      <Text style={styles.para}>
        Shule Bora is a platform for managing student information and academic
        records.
      </Text>
      {/* navigation.navigate matches the 'name' prop defined in App.js */}
      <Button
        style={styles.button}
        title="Go to Students Screen"
        onPress={() => navigation.navigate("Students")}
      />
      <Button
        style={styles.button}
        title="Go to Subjects Screen"
        onPress={() => navigation.navigate("Subjects")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 28, marginBottom: 20, textAlign: "center", color: "pink" },
  para: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  button: {
    fontSize: 22,
    marginBottom: 20,
    backgroundColor: "pink",
    color: "white",
  },
});

import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.screen} edges={["left", "right", "bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>SB</Text>
          </View>
          <Text style={styles.eyebrow}>SCHOOL MANAGEMENT</Text>
          <Text style={styles.heading}>Welcome to Shule Bora</Text>
          <Text style={styles.description}>
            A simpler way to manage student information and explore your school's
            learning resources.
          </Text>
        </View>

        <Text style={styles.sectionHeading}>Your school</Text>

        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate("Students")}
          style={({ pressed }) => [
            styles.navigationCard,
            pressed && styles.cardPressed,
          ]}
        >
          <View style={styles.cardIcon}>
            <Text style={styles.cardIconText}>ST</Text>
          </View>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Students</Text>
            <Text style={styles.cardDescription}>
              View student records and add new students.
            </Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate("Subjects")}
          style={({ pressed }) => [
            styles.navigationCard,
            pressed && styles.cardPressed,
          ]}
        >
          <View style={styles.cardIcon}>
            <Text style={styles.cardIconText}>SB</Text>
          </View>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Subjects</Text>
            <Text style={styles.cardDescription}>
              Browse subjects offered at your school.
            </Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F3F7F6",
  },
  content: {
    flexGrow: 1,
    padding: 22,
    paddingBottom: 36,
  },
  hero: {
    backgroundColor: "#173B3A",
    borderRadius: 20,
    marginBottom: 30,
    padding: 24,
  },
  brandMark: {
    alignItems: "center",
    backgroundColor: "#D8EEE8",
    borderRadius: 16,
    height: 54,
    justifyContent: "center",
    marginBottom: 24,
    width: 54,
  },
  brandMarkText: {
    color: "#145E55",
    fontSize: 18,
    fontWeight: "800",
  },
  eyebrow: {
    color: "#B5DDD3",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 37,
  },
  description: {
    color: "#E1EFEC",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
  },
  sectionHeading: {
    color: "#173B3A",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 14,
  },
  navigationCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#DFE9E6",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: 12,
    minHeight: 92,
    padding: 16,
  },
  cardPressed: {
    opacity: 0.8,
  },
  cardIcon: {
    alignItems: "center",
    backgroundColor: "#E1F1ED",
    borderRadius: 12,
    height: 48,
    justifyContent: "center",
    marginRight: 14,
    width: 48,
  },
  cardIconText: {
    color: "#12685F",
    fontSize: 14,
    fontWeight: "800",
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    color: "#193A38",
    fontSize: 17,
    fontWeight: "700",
  },
  cardDescription: {
    color: "#5C706D",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  chevron: {
    color: "#167D72",
    fontSize: 28,
    marginLeft: 8,
  },
});

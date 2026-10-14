import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_URL = "https://bora.kipchirchir.co.ke/subjects";

export default function SubjectsScreen({ navigation }) {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadSubjects = useCallback(async (isActive, isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setErrorMessage("");

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Could not load subjects. Please try again.");
      }
      const data = await response.json();
      if (!Array.isArray(data.subjects)) {
        throw new Error("The server returned an invalid subject list.");
      }
      if (isActive()) {
        setSubjects(data.subjects);
      }
    } catch (error) {
      if (isActive()) {
        setErrorMessage(
          error instanceof Error ? error.message : "Could not load subjects."
        );
      }
    } finally {
      if (isActive()) {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      loadSubjects(() => active);
      return () => {
        active = false;
      };
    }, [loadSubjects])
  );

  const refreshSubjects = () => {
    loadSubjects(() => true, true);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right", "bottom"]}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={subjects}
        keyExtractor={(item, index) =>
          item.subject_id?.toString() || `${item.subject_name}-${index}`
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshSubjects}
            tintColor="#167D72"
            colors={["#167D72"]}
          />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.eyebrow}>LEARNING</Text>
            <Text style={styles.heading}>Subjects</Text>
            <Text style={styles.description}>
              Explore the subjects offered at your school.
            </Text>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeading}>All subjects</Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => navigation.navigate("NewSubject")}
                style={({ pressed }) => [
                  styles.addButton,
                  pressed && styles.addButtonPressed,
                ]}
              >
                <Text style={styles.addButtonText}>+ Add subject</Text>
              </Pressable>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.stateCard}>
            {isLoading ? (
              <>
                <ActivityIndicator color="#167D72" />
                <Text style={styles.stateText}>Loading subjects…</Text>
              </>
            ) : errorMessage ? (
              <>
                <Text style={styles.stateTitle}>Subjects unavailable</Text>
                <Text style={styles.stateText}>{errorMessage}</Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={refreshSubjects}
                  style={styles.retryButton}
                >
                  <Text style={styles.retryText}>Try again</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.stateTitle}>No subjects yet</Text>
                <Text style={styles.stateText}>
                  Subjects will appear here when they are available.
                </Text>
              </>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.subjectCard}>
            <View style={styles.subjectIcon}>
              <Text style={styles.subjectIconText}>
                {item.subject_name?.trim()?.charAt(0)?.toUpperCase() || "S"}
              </Text>
            </View>
            <View style={styles.subjectDetails}>
              <Text style={styles.subjectName}>
                {item.subject_name || "Unnamed subject"}
              </Text>
              {item.subject_id != null && (
                <Text style={styles.subjectId}>Subject {item.subject_id}</Text>
              )}
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F7F6",
  },
  list: {
    flex: 1,
    backgroundColor: "#F3F7F6",
  },
  listContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 18,
  },
  eyebrow: {
    color: "#167D72",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  heading: {
    color: "#173B3A",
    fontSize: 32,
    fontWeight: "800",
  },
  description: {
    color: "#526765",
    fontSize: 16,
    lineHeight: 23,
    marginTop: 6,
  },
  sectionHeading: {
    color: "#173B3A",
    fontSize: 19,
    fontWeight: "700",
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 28,
  },
  addButton: {
    alignItems: "center",
    backgroundColor: "#167D72",
    borderRadius: 8,
    justifyContent: "center",
    minHeight: 40,
    paddingHorizontal: 12,
  },
  addButtonPressed: {
    opacity: 0.82,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  subjectCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#DFE9E6",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    padding: 15,
  },
  subjectIcon: {
    alignItems: "center",
    backgroundColor: "#E1F1ED",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    marginRight: 13,
    width: 48,
  },
  subjectIconText: {
    color: "#12685F",
    fontSize: 19,
    fontWeight: "700",
  },
  subjectDetails: {
    flex: 1,
  },
  subjectName: {
    color: "#193A38",
    fontSize: 16,
    fontWeight: "700",
  },
  subjectId: {
    color: "#5C706D",
    fontSize: 14,
    marginTop: 4,
  },
  separator: {
    height: 10,
  },
  stateCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#DFE9E6",
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 4,
    padding: 24,
  },
  stateTitle: {
    color: "#193A38",
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },
  stateText: {
    color: "#5C706D",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 9,
    textAlign: "center",
  },
  retryText: {
    color: "#12685F",
    fontSize: 15,
    fontWeight: "700",
  },
  retryButton: {
    marginTop: 14,
    padding: 8,
  },
});

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

const API_URL = "https://bora.kipchirchir.co.ke/students";

export default function StudentsScreen({ navigation }) {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadStudents = useCallback(async (isActive, isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setErrorMessage("");

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Could not load students. Please try again.");
      }
      const data = await response.json();
      if (!Array.isArray(data.students)) {
        throw new Error("The server returned an invalid student list.");
      }
      if (isActive()) {
        setStudents(data.students);
      }
    } catch (error) {
      if (isActive()) {
        setErrorMessage(
          error instanceof Error ? error.message : "Could not load students."
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
      loadStudents(() => active);
      return () => {
        active = false;
      };
    }, [loadStudents])
  );

  const refreshStudents = () => {
    loadStudents(() => true, true);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.eyebrow}>SCHOOL DIRECTORY</Text>
      <Text style={styles.heading}>Students</Text>
      <Text style={styles.description}>
        Browse and manage your student records.
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => navigation.navigate("NewStudent")}
        style={({ pressed }) => [
          styles.primaryButton,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.primaryButtonText}>+  Add student</Text>
      </Pressable>
      <Text style={styles.sectionHeading}>All students</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right", "bottom"]}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={students}
        keyExtractor={(item, index) =>
          item.student_id?.toString() || `${item.admission_number}-${index}`
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshStudents}
            tintColor="#167D72"
            colors={["#167D72"]}
          />
        }
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.stateCard}>
            {isLoading ? (
              <>
                <ActivityIndicator color="#167D72" />
                <Text style={styles.stateText}>Loading students…</Text>
              </>
            ) : errorMessage ? (
              <>
                <Text style={styles.stateTitle}>Students unavailable</Text>
                <Text style={styles.stateText}>{errorMessage}</Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={refreshStudents}
                  style={styles.retryButton}
                >
                  <Text style={styles.retryText}>Try again</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.stateTitle}>No students yet</Text>
                <Text style={styles.stateText}>
                  Add a student to see their record here.
                </Text>
              </>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.studentCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.student_name?.trim()?.charAt(0)?.toUpperCase() || "S"}
              </Text>
            </View>
            <View style={styles.studentDetails}>
              <Text style={styles.studentName}>{item.student_name}</Text>
              <Text style={styles.admissionNumber}>
                Admission no. {item.admission_number}
              </Text>
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
  primaryButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#167D72",
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 20,
    minHeight: 48,
    paddingHorizontal: 18,
  },
  buttonPressed: {
    opacity: 0.82,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  sectionHeading: {
    color: "#173B3A",
    fontSize: 19,
    fontWeight: "700",
    marginTop: 28,
  },
  studentCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#DFE9E6",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    padding: 15,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: "#E1F1ED",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    marginRight: 13,
    width: 48,
  },
  avatarText: {
    color: "#12685F",
    fontSize: 19,
    fontWeight: "700",
  },
  studentDetails: {
    flex: 1,
  },
  studentName: {
    color: "#193A38",
    fontSize: 16,
    fontWeight: "700",
  },
  admissionNumber: {
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
  retryButton: {
    marginTop: 14,
    padding: 8,
  },
  retryText: {
    color: "#12685F",
    fontSize: 15,
    fontWeight: "700",
  },
});

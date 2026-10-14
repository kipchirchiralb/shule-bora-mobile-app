import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";

const fields = [
  {
    name: "admission_number",
    label: "Admission number",
    placeholder: "Enter admission number",
    autoCapitalize: "characters",
  },
  {
    name: "student_name",
    label: "Student name",
    placeholder: "Enter student's full name",
    autoCapitalize: "words",
  },
  {
    name: "gender",
    label: "Gender",
    placeholder: "Enter gender",
    autoCapitalize: "words",
  },
  {
    name: "date_of_birth",
    label: "Date of birth",
    placeholder: "YYYY-MM-DD",
    keyboardType: "numbers-and-punctuation",
  },
  {
    name: "guardian_name",
    label: "Guardian name",
    placeholder: "Enter guardian's full name",
    autoCapitalize: "words",
  },
  {
    name: "guardian_phone",
    label: "Guardian phone",
    placeholder: "Enter guardian's phone number",
    keyboardType: "phone-pad",
  },
  {
    name: "classroom_id",
    label: "Classroom ID",
    placeholder: "Enter classroom ID",
    keyboardType: "numeric",
  },
];

const initialValues = Object.fromEntries(fields.map(({ name }) => [name, ""]));

export default function NewStudentScreen({ navigation }) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const headerHeight = useHeaderHeight();

  const updateField = (name, value) => {
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
  };

  const submitStudent = async () => {
    const missingField = fields.find(({ name }) => !values[name].trim());
    if (missingField) {
      Alert.alert("Missing information", `Please enter ${missingField.label.toLowerCase()}.`);
      return;
    }

    if (!/^\d+$/.test(values.classroom_id.trim())) {
      Alert.alert("Invalid classroom ID", "Please enter a numeric classroom ID.");
      return;
    }

    setIsSubmitting(true);
    try {
      const body = fields
        .map(({ name }) => {
          const value = values[name].trim();
          return `${encodeURIComponent(name)}=${encodeURIComponent(value).replace(/%20/g, "+")}`;
        })
        .join("&");
      const response = await fetch("https://bora.kipchirchir.co.ke/add-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to add the student.");
      }

      Alert.alert("Student added", "The student was added successfully.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert(
        "Unable to add student",
        error instanceof Error ? error.message : "Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView
      style={styles.screen}
      edges={["left", "right", "bottom"]}
    >
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={headerHeight}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
        >
          <Text style={styles.heading}>Add a student</Text>
          <Text style={styles.description}>
            Enter the student's details below.
          </Text>

          {fields.map((field) => (
            <View key={field.name} style={styles.field}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput
                accessibilityLabel={field.label}
                style={styles.input}
                value={values[field.name]}
                onChangeText={(value) => updateField(field.name, value)}
                placeholder={field.placeholder}
                placeholderTextColor="#71827F"
                autoCapitalize={field.autoCapitalize || "none"}
                keyboardType={field.keyboardType || "default"}
                returnKeyType="next"
              />
            </View>
          ))}

          <Pressable
            accessibilityRole="button"
            disabled={isSubmitting}
            onPress={submitStudent}
            style={({ pressed }) => [
              styles.submitButton,
              (pressed || isSubmitting) && styles.submitButtonPressed,
            ]}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.submitButtonText}>Save Student</Text>
            )}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F3F7F6",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 36,
  },
  heading: {
    color: "#173B3A",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 6,
  },
  description: {
    color: "#526765",
    fontSize: 16,
    marginBottom: 24,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    color: "#294744",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 7,
  },
  input: {
    backgroundColor: "#ffffff",
    borderColor: "#C9D9D5",
    borderRadius: 8,
    borderWidth: 1,
    color: "#193A38",
    fontSize: 16,
    minHeight: 48,
    paddingHorizontal: 12,
  },
  submitButton: {
    alignItems: "center",
    backgroundColor: "#167D72",
    borderRadius: 8,
    justifyContent: "center",
    marginTop: 8,
    minHeight: 50,
  },
  submitButtonPressed: {
    opacity: 0.75,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});

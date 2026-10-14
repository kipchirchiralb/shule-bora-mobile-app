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
    name: "subject_name",
    label: "Subject name",
    placeholder: "Enter subject name",
    autoCapitalize: "words",
  },
  {
    name: "subject_code",
    label: "Subject code",
    placeholder: "Enter subject code",
    autoCapitalize: "characters",
  },
  {
    name: "category",
    label: "Category",
    placeholder: "Enter subject category",
    autoCapitalize: "words",
  },
];

const initialValues = Object.fromEntries(fields.map(({ name }) => [name, ""]));

export default function NewSubjectScreen({ navigation }) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const headerHeight = useHeaderHeight();

  const updateField = (name, value) => {
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
  };

  const submitSubject = async () => {
    const missingField = fields.find(({ name }) => !values[name].trim());
    if (missingField) {
      Alert.alert(
        "Missing information",
        `Please enter ${missingField.label.toLowerCase()}.`
      );
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
      const response = await fetch("https://bora.kipchirchir.co.ke/add-subject", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to add the subject.");
      }

      Alert.alert(
        "Subject added",
        result.message || "The subject was added successfully.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert(
        "Unable to add subject",
        error instanceof Error
          ? error.message
          : "Please check your connection and try again."
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
          <View style={styles.intro}>
            <Text style={styles.eyebrow}>LEARNING</Text>
            <Text style={styles.heading}>Add a subject</Text>
            <Text style={styles.description}>
              Enter the subject details to add it to your school.
            </Text>
          </View>

          <View style={styles.formCard}>
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
                  autoCapitalize={field.autoCapitalize}
                  returnKeyType="next"
                />
              </View>
            ))}

            <Pressable
              accessibilityRole="button"
              disabled={isSubmitting}
              onPress={submitSubject}
              style={({ pressed }) => [
                styles.submitButton,
                (pressed || isSubmitting) && styles.submitButtonPressed,
              ]}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.submitButtonText}>Save subject</Text>
              )}
            </Pressable>
          </View>
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
  intro: {
    marginBottom: 22,
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
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 6,
  },
  description: {
    color: "#526765",
    fontSize: 16,
    lineHeight: 23,
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#DFE9E6",
    borderRadius: 14,
    borderWidth: 1,
    padding: 18,
  },
  field: {
    marginBottom: 18,
  },
  label: {
    color: "#294744",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 7,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#C9D9D5",
    borderRadius: 9,
    borderWidth: 1,
    color: "#193A38",
    fontSize: 16,
    minHeight: 50,
    paddingHorizontal: 13,
  },
  submitButton: {
    alignItems: "center",
    backgroundColor: "#167D72",
    borderRadius: 9,
    justifyContent: "center",
    marginTop: 4,
    minHeight: 50,
  },
  submitButtonPressed: {
    opacity: 0.78,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});

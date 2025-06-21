import VoiceRecorder from "@/components/VoiceRecorder";
import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewEntry() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.topSection}>
        <View style={styles.header}>
          <Text style={styles.title}>New Journal Entry</Text>
          <Text style={styles.subtitle}>Record your thoughts</Text>
        </View>
      </View>
      <VoiceRecorder />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  topSection: {
    flex: 1,
    paddingTop: 80,
  },
  header: {
    alignItems: "center",
    marginBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
  }
});
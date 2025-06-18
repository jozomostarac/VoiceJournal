import { StyleSheet, Text, View } from "react-native";

export default function NewEntry() {
  return (
    <View style={styles.container}>
      <Text>New Entry</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
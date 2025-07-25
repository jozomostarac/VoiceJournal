import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return <Tabs
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="my_journal"
  >
    <Tabs.Screen
      name="new_entry"
      options={{
        title: "New Entry",
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="add" size={24} color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="my_journal"
      options={{
        title: "My Journal",
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="book" size={24} color={color} />
        ),
      }}
    />
  </Tabs>
}
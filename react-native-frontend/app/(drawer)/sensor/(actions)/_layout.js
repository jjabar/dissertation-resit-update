import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ProtectedRoute from "../../../../component/ProtectedRoute";

export default function _layout() {
  return (
    <ProtectedRoute>
      <Tabs screenOptions={{ tabBarActiveTintColor: "#8ac926" }}>
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Sensor",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="motion-sensor"
                color={color}
                size={28}
              />
            ),
           
          }}
        />

        <Tabs.Screen
          name="add"
          options={{
            headerShown: false,
            title: "Add",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="plus" color={color} size={28} />
            ),
           
          }}
        />
      </Tabs>
    </ProtectedRoute>
  );
}

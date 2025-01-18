import { Stack } from "expo-router";
import ProtectedRoute from "../../../component/ProtectedRoute";

export default function _layout() {
  return (
    <ProtectedRoute>
      <Stack>
        <Stack.Screen
          name="(actions)"
          options={{ headerShown: false, title: "Animal" }}
        />
        <Stack.Screen
          name="show-sensor"
          options={{ title: "Add", headerShown: false }}
        />
        <Stack.Screen
          name="edit-sensor"
          options={{ title: "Edit", headerShown: false }}
        />
      </Stack>
    </ProtectedRoute>
  );
}

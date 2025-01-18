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
          name="show-animal"
          options={{ title: "Add", headerShown: false }}
        />
        <Stack.Screen
          name="edit-animal"
          options={{ title: "Add", headerShown: false }}
        />
      </Stack>
    </ProtectedRoute>
  );
}

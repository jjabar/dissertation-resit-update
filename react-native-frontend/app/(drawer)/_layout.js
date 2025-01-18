import React from "react";
import ProtectedRoute from "../../component/ProtectedRoute";
import MyCustomDrawer from "../../component/MyCustomDrawer";
import {Drawer} from "expo-router/drawer"
import {  MaterialCommunityIcons } from "@expo/vector-icons";



//const Drawer = createDrawerNavigator()

export default function _layout() {
    return (
      <ProtectedRoute>
        <Drawer
          screenOptions={{
            drawerActiveBackgroundColor: "#8ac926",
            drawerActiveTintColor: "#fff",
            drawerInactiveTintColor: "#333",
          }}
          drawerContent={MyCustomDrawer}
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: "Location",
              title: "Location",
              drawerIcon: ({ size, color }) => (
                <MaterialCommunityIcons
                  name="map-marker-radius"
                  size={size}
                  color={color}
                />
              ),
            }}
          />

          <Drawer.Screen
            name="animal"
            options={{
              drawerLabel: "Animal Management",
              title: "Animal Management",
              drawerIcon: ({ size, color }) => (
                <MaterialCommunityIcons name="cow" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="sensor"
            options={{
              drawerLabel: "Sensor Management",
              title: "Sensor Management",
              drawerIcon: ({ size, color }) => (
                <MaterialCommunityIcons
                  name="motion-sensor"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="examination"
            options={{
              drawerLabel: "Health Examination",
              title: "Health Examination",
              drawerIcon: ({ size, color }) => (
                <MaterialCommunityIcons
                  name="stethoscope"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="visualization"
            options={{
              drawerLabel: "Visualization",
              title: "Visualization",
              drawerIcon: ({ size, color }) => (
                <MaterialCommunityIcons
                  name="chart-bell-curve-cumulative"
                  size={size}
                  color={color}
                />
              ),
            }}
          />

          <Drawer.Screen
            name="summary"
            options={{
              drawerLabel: "Summary",
              title: "Summary",
              drawerIcon: ({ size, color }) => (
                <MaterialCommunityIcons
                  name="file-chart-outline"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="exports"
            options={{
              drawerLabel: "Export CSV",
              title: "Export CSV",
              drawerIcon: ({ size, color }) => (
                <MaterialCommunityIcons
                  name="file-export"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="profile"
            options={{
              drawerLabel: "Profile",
              title: "Profile",
              drawerIcon: ({ size, color }) => (
                <MaterialCommunityIcons
                  name="account"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
        </Drawer>
      </ProtectedRoute>
    );
    
} 
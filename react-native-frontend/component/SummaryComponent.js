import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import React from 'react'

const SummaryComponent = ({sensor, stats}) => {
  return (
    <>
      <Text style={styles.title}>Daily Summary</Text>
      <Text style={styles.title}>
        {sensor.toUpperCase() || " "}
        <Text style={styles.subtext}>[{stats?.count}items]</Text>
      </Text>

      <View style={styles.techList}>
        <Text style={styles.subtitle}>Temperature Data: &#x2103;</Text>
        <LinearGradient colors={["#61DBFB", "#35AFC2"]} style={styles.techItem}>
          <Text style={styles.techText}>
            Average Temp: {stats?.avgTemperature} &#x2103;
          </Text>
        </LinearGradient>
        <LinearGradient colors={["#764ABC", "#543B9A"]} style={styles.techItem}>
          <Text style={styles.techText}>
            Min Temp: {stats?.minTemperature} &#x2103;
          </Text>
        </LinearGradient>
        <LinearGradient colors={["#FF4154", "#D12B3A"]} style={styles.techItem}>
          <Text style={styles.techText}>
            Max Temp: {stats?.maxTemperature} &#x2103;
          </Text>
        </LinearGradient>
      </View>
      <View style={styles.techList}>
        <Text style={styles.subtitle}>Heartbeat Data: &#x2764;</Text>
        <LinearGradient colors={["#61DBFB", "#35AFC2"]} style={styles.techItem}>
          <Text style={styles.techText}>
            Average Heartbeat: {stats?.avgHeartbeat}/min
          </Text>
        </LinearGradient>
        <LinearGradient colors={["#764ABC", "#543B9A"]} style={styles.techItem}>
          <Text style={styles.techText}>
            Min Heartbeat: {stats?.minHeartbeat}/min
          </Text>
        </LinearGradient>
        <LinearGradient colors={["#FF4154", "#D12B3A"]} style={styles.techItem}>
          <Text style={styles.techText}>
            Max Heartbeat: {stats?.maxHeartbeat}/min
          </Text>
        </LinearGradient>
      </View>
    </>
  );
}

export default SummaryComponent

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#666",
  },
  subtext: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
  },
  techList: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  techItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 5,
  },
  techText: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 10,
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
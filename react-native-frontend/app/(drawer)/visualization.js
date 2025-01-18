import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { fetchHourlySummary, fetchSensors } from "../(services)/api/api";
import DropDown from "../../component/DropDown";
import LineChartComponent from "../../component/LineChartComponent";

const Visualization = () => {
  const [stats, setStats] = useState(null);
  const [sensors, setSensors] = useState([]);
  const [sensor, setSensor] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSensorsList = async () => {
    const { animals } = await fetchSensors();
    setSensors([...animals]);
  };

  useEffect(() => {
    fetchSensorsList();
  }, []);

  //handleSelect
  const handleSelect = async (item) => {
    setLoading(true);
    setSensor(item);
    const { data } = await fetchHourlySummary(item);
    
    setLoading(false);
    setStats({ ...data });
  };

 

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          animating={true}
          size="large"
          style={{ opacity: 1 }}
          color="#8ac926"
        />
      ) : (
        <>
          <DropDown
            sensors={sensors}
            sensor={sensor}
            handleSelect={handleSelect}
          />
          
          <ScrollView>
            
            <Text style={styles.title}>{sensor.toUpperCase() || " "}</Text>
            {stats !== null  && <LineChartComponent stats={stats} />}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Visualization;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 30,
    backgroundColor: "#f5f5f5",
    gap: 10,
  },
});

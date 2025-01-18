import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { fetchDailySummary, fetchSensors } from "../(services)/api/api";
import DropDown from "../../component/DropDown";
import SummaryComponent from "../../component/SummaryComponent";

const Summary = () => {
  const [stats, setStats] = useState(null);
  const [sensors, setSensors] = useState({})
  const [sensor, setSensor] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSensorsList  = async () => {
      const {animals} = await fetchSensors();
      setSensors([...animals]);
  }

  useEffect(() => {
    fetchSensorsList();
  },[])

  //handleSelect
  const handleSelect = async(item) => {
    setLoading(true);
    setSensor(item)
    const {dailySummary} = await fetchDailySummary(item);
    setLoading(false)
    setStats({...dailySummary?.[0]})

  } 

 

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
          <ScrollView style={styles.scrollView}>
            <SummaryComponent sensor={sensor} stats={stats} />
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 30,
    paddingBottom: 10,
    backgroundColor: "#f5f5f5",
    gap: 10,
  },
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
  scrollView : {
    width: "100%"
  }
  
  
});

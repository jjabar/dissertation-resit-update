import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { DataTable } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { deleteSensor, fetchAllSensors } from "../../../(redux)/sensorSlice";


export default function AnimalList() {
   const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  useEffect(() => {
    dispatch(fetchAllSensors());
  }, [sensors, isFocused]);


  const {sensors, status} = useSelector(state => state?.sensors)
 
 
  return (
    <View style={styles.container}>
      {status === "Loading" ? (
        <ActivityIndicator
          animating={true}
          size="large"
          style={{ opacity: 1 }}
          color="#8ac926"
        />
      ) : sensors?.length === 0 ? (
        <Text style={styles.noDataText}>No Data Found</Text>
      ) : (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{ width: 140 }}>Sensor</DataTable.Title>
            <DataTable.Title>Active</DataTable.Title>
            <DataTable.Title>Show</DataTable.Title>
            <DataTable.Title>Edit</DataTable.Title>
            <DataTable.Title>Delete</DataTable.Title>
          </DataTable.Header>
          {sensors?.map((sensor) => (
            <DataTable.Row key={sensor?._id}>
              <DataTable.Cell>{sensor?.sensorTag}</DataTable.Cell>

              <DataTable.Cell>
                {sensor?.isActivated ? (
                  <Text style={styles.textSuccess}>Yes</Text>
                ) : (
                  <Text style={styles.textDanger}>No</Text>
                )}
              </DataTable.Cell>
              <DataTable.Cell>
                {" "}
                <MaterialCommunityIcons
                  name="eye"
                  size={24}
                  color="#8ac926"
                  onPress={() =>
                    navigation.navigate("show-sensor", { id: sensor?._id })
                  }
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <MaterialCommunityIcons
                  name="pencil"
                  size={24}
                  color="#219ebc"
                  onPress={() =>
                    navigation.navigate("edit-sensor", { id: sensor?._id })
                  }
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <MaterialCommunityIcons
                  name="delete"
                  size={24}
                  color="#c1121f"
                  onPress={() => {
                    dispatch(deleteSensor(sensor?._id));
                  }}
                />
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  noDataText: {
    textTransform: "capitalize",
    alignSelf: "center",
    fontSize: 32,
    color: "#d00000",
  },
  textSuccess: {
    color: "green",
  },
  textDanger: {
    color: "red",
  },
});



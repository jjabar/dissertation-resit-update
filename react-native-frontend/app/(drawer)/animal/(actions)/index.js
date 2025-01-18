import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { DataTable } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useIsFocused, useNavigation } from "@react-navigation/native";
import { detachAnimalSensor, fetchAllAnimals } from "../../../(redux)/animalSlice";
import { useDispatch, useSelector } from "react-redux";


export default function AnimalList() {
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchAllAnimals());
  },[isFocused, fetchAllAnimals])

  const {animals, status} = useSelector(state => state?.animals);
 
  return (
    <View style={styles.container}>
      {status === "Loading" ? (
        <ActivityIndicator
          animating={true}
          size="large"
          style={{ opacity: 1 }}
          color="#8ac926"
        />
      ) : (
        <>
          {animals?.length > 0 ? (
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Tag</DataTable.Title>
                <DataTable.Title>Monitored</DataTable.Title>
                <DataTable.Title>Show</DataTable.Title>
                <DataTable.Title>Edit</DataTable.Title>
                <DataTable.Title>Detach</DataTable.Title>
              </DataTable.Header>
              {animals?.map((animal, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{animal?.animalTag}</DataTable.Cell>

                  <DataTable.Cell>
                    {animal?.isMonitored ? (
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
                        navigation.navigate("show-animal", { id: animal?._id })
                      }
                    />
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <MaterialCommunityIcons
                      name="pencil"
                      size={24}
                      color="#219ebc"
                      onPress={() =>
                        navigation.navigate("edit-animal", { id: animal?._id })
                      }
                    />
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <MaterialCommunityIcons
                      name="cancel"
                      size={24}
                      color="#c1121f"
                      onPress={() => {
                        dispatch(
                          detachAnimalSensor({
                            animalId: animal?._id,
                            sensorNumber: animal?.sensorNumber,
                          })
                        );
                      }}
                    />
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          ) : (
            <Text style={styles.noDataText}>No Animal Data found</Text>
          )}
        </>
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




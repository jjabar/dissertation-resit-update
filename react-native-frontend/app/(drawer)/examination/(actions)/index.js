import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Text, ScrollView } from "react-native";
import { DataTable } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllExaminations } from "../../../(redux)/examinationSlice";


export default function ExaminationList() {
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchAllExaminations());
  }, [isFocused, fetchAllExaminations]);

  const { examinations, status } = useSelector((state) => state?.examinations);

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
        <ScrollView>
          {examinations?.length > 0 ? (
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Tag</DataTable.Title>
                <DataTable.Title>Monitored</DataTable.Title>
                <DataTable.Title>Show</DataTable.Title>
                
              </DataTable.Header>
              {examinations?.map((examination) => (
                <DataTable.Row key={examination?._id}>
                  <DataTable.Cell>{examination?.animalTag}</DataTable.Cell>

                  <DataTable.Cell>
                    {new Date(examination?.createdAt)?.toLocaleDateString()}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    {" "}
                    <MaterialCommunityIcons
                      name="eye"
                      size={24}
                      color="#8ac926"
                      onPress={() =>
                        navigation.navigate("show-examination", { id: examination?._id })
                      }
                    />
                  </DataTable.Cell>
                  
                  
                </DataTable.Row>
              ))}
            </DataTable>
          ) : (
            <Text style={styles.noDataText}>No Animal Data found</Text>
          )}
        </ScrollView>
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




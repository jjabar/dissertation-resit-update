import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSensor } from '../../(redux)/sensorSlice';
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function ShowSensor() {
  const route = useRoute();
  const isFocused = useIsFocused()
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {id} = route.params;
  
  useEffect(() => {
    dispatch(fetchSensor(id))
  }, [id, isFocused])

  const {sensor, status} = useSelector(state => state?.sensors);


  return (
    <View style={styles.container}>
      {status === "Loading" ? (
        <ActivityIndicator
          animating={true}
          size="large"
          style={{ opacity: 1, alignSelf: "center" }}
          color="#8ac926"
        />
      ) : (
        <>
          <TouchableOpacity onPress={() => navigation.navigate("(actions)")}>
            <View style={styles.button}>
              <MaterialCommunityIcons name="arrow-left" size={24} />
              <Text style={styles.buttonText}>Back</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.title}> Sensor Details</Text>
          {sensor ? (
            <>
              <Text style={styles.text}>Sensor Tag: {sensor?.sensorTag}</Text>
              <Text style={styles.text}>Animal Tracking: {sensor?.animal}</Text>
              <Text style={styles.text}>
                Status:{" "}
                {sensor?.isActivated ? (
                  <Text style={styles.textSuccess}>Active</Text>
                ) : (
                  <Text style={styles.textDanger}>Inactive</Text>
                )}
              </Text>
              <Text style={styles.text}>
                Sensor Description: {sensor?.description}
              </Text>
            </>
          ) : (
            <Text style={styles.text}>No Sensor Data found</Text>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 16,
    backgroundColor: "#f5f5f5",
    paddingInline: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  text: {
    fontSize: 18,
    marginBottom: 16,
    textTransform: "capitalize",
  },
  button: {
    height: 50,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#8ac926",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  textSuccess: {
    color: "green",
  },
  textDanger: {
    color: "red",
  },
});
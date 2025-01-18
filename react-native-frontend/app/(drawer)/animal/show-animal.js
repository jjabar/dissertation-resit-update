import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, ScrollView
} from "react-native";
import React, { useEffect } from "react";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { fetchAnimal } from "../../(redux)/animalSlice";

export default function ShowAnimal() {
  const route = useRoute();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { id } = route.params;

  useEffect(() => {
    dispatch(fetchAnimal(id));
  }, [id, isFocused]);

  const { animal, status } = useSelector((state) => state?.animals);

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
        <ScrollView>
          <TouchableOpacity onPress={() => navigation.navigate("(actions)")}>
            <View style={styles.button}>
              <MaterialCommunityIcons name="arrow-left" size={24} />
              <Text style={styles.buttonText}>Back</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.title}> Animal Details</Text>
          {animal ? (
            <>
              <Text style={styles.text}>Animal Tag: {animal?.animalTag}</Text>
              <Text style={styles.text}>
                Tracking Sensor: {animal?.sensorNumber}
              </Text>
              <Text style={styles.text}>Age(months): {animal?.age}</Text>
              <Text style={styles.text}>Height(cm): {animal?.height}</Text>
              <Text style={styles.text}>Weight(kg): {animal?.weight}</Text>
              <Text style={styles.text}>Gender: {animal?.gender}</Text>
              <Text style={styles.text}>
                Tracking Sensor: {animal?.sensorNumber}
              </Text>
              <Text style={styles.text}>
                Status:{" "}
                {animal?.isMonitored ? (
                  <Text style={styles.textSuccess}>Active</Text>
                ) : (
                  <Text style={styles.textDanger}>Inactive</Text>
                )}
              </Text>
              <Text style={styles.text}>
                Animal Description: {animal?.description}
              </Text>
            </>
          ) : (
            <Text style={styles.text}>No Animal Data found</Text>
          )}
        </ScrollView>
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

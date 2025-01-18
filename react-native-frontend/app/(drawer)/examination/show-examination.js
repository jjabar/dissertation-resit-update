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
import { fetchExamination } from "../../(redux)/examinationSlice";

export default function ShowAnimal() {
  const route = useRoute();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { id } = route.params;

  useEffect(() => {
    dispatch(fetchExamination(id));
  }, [id, isFocused]);

  const { examination, status } = useSelector((state) => state?.examinations);

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
          <Text style={styles.title}> Examination Details</Text>
          {examination ? (
            <>
              <Text style={styles.text}>Animal Tag: {examination?.animalTag}</Text>
              <Text style={styles.text}>
                Animal Gender: {examination?.gender}
              </Text>
              <Text style={styles.text}>Age(months): {examination?.age}</Text>
              <Text style={styles.text}>Height(cm): {examination?.height}</Text>
              <Text style={styles.text}>Weight(kg): {examination?.weight}</Text>
              <Text style={styles.text}>Temperature(0c): {examination?.temperature}</Text>
              <Text style={styles.text}>
                 Heartbeat: {examination?.heartBeat}
              </Text>
              <Text style={styles.text}>
                Gender: {examination?.gender}
              </Text>
              <Text style={styles.text}>
                Examination comment: {examination?.comment}
              </Text>
            </>
          ) : (
            <Text style={styles.text}>No Examination Data found</Text>
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

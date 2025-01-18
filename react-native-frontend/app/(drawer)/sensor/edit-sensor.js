import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import React, {useEffect, useState} from 'react'
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getSensorForEdit } from "../../(services)/api/api";
import { useDispatch, useSelector } from "react-redux";
import { updateSensor } from "../../(redux)/sensorSlice";

export default function EditSensor() {
  const route = useRoute();
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const {id} = route.params;

  const [description, setDescription] = useState("");
  const [productNumber, setProductNumber] = useState("");
  const [fetchLoading, setFetchLoading] = useState("false");

  const { status } = useSelector((state) => state?.sensors);

  const fetchData = async () => {
    setFetchLoading(true)
    const sensor = await getSensorForEdit(id);
    setFetchLoading(false);
    setDescription(sensor?.description);
    setProductNumber(sensor?.productNumber);
  }

  useEffect(() => {
    fetchData();
  },[id, isFocused])


  const handleSubmit = async () => {
    if (description === "") {
      Alert.alert("Fill description field");
      return;
    }

    if (productNumber === "") {
      Alert.alert("Fill product number on  sensor carton");
      return;
    }
    await dispatch(updateSensor({ description, productNumber, sensorId: id }));
    setDescription("");
    setProductNumber("");
  }; 

  return (
    <View style={styles.container}>
      {fetchLoading ? (
        <ActivityIndicator
          animating={true}
          size="large"
          style={{ opacity: 1 }}
          color="#8ac926"
        />
      ) : (
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("(actions)")}>
            <View style={styles.button}>
              <MaterialCommunityIcons name="arrow-left" size={24} />
              <Text style={styles.buttonText}>Back</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.title}>Edit Sensor</Text>
          <View style={styles.form}>
            <Text style={styles.labelText}>Product Number</Text>
            <TextInput
              style={styles.input}
              name="productNumber"
              placeholder="Product Number on the pack"
              onChangeText={setProductNumber}
              value={productNumber}
            />
            <Text style={styles.labelText}>Sensor Description</Text>
            <TextInput
              style={styles.textarea}
              name="description"
              multiline={true}
              numberOfLines={10}
              placeholder="Sensor Description"
              onChangeText={setDescription}
              value={description}
            />

            {/* Login Button */}
            <TouchableOpacity onPress={handleSubmit}>
              <View style={styles.button}>
                {status === "Loading" ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Update Sensor</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "#8ac926",
    borderWidth: 5,
    resizeMode: "cover",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333",
  },
  form: {
    width: "100%",
  },
  labelText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    display: "block",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  textarea: {
    height: 200,
    textAlignVertical: "top",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
  successText: {
    color: "#8ac926",
    marginBottom: 16,
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
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    color: "#333",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "400",
  },
});
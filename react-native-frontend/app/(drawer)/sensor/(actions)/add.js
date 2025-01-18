import React, {useState} from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { createSensor } from '../../../(redux)/sensorSlice';



const AddSensor = () => {
  const dispatch = useDispatch();
  
  const [description, setDescription] = useState("");
  const [productNumber, setProductNumber] = useState("");
  const {status} = useSelector(state => state?.sensors)
   
   
    const handleSubmit = async () => {
       if (description === "") {
         Alert.alert("Fill description field");
         return;
       }

       if (productNumber === "") {
         Alert.alert("Fill product number on  sensor carton");
         return;
       }
      await dispatch(createSensor({description, productNumber}))
      setDescription("")
      setProductNumber("")
    } 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Sensor</Text>
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
              <Text style={styles.buttonText}>Add Sensor</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default AddSensor

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
    backgroundColor: "#8ac926",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
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
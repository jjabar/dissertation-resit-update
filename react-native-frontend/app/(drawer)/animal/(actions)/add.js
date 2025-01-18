import React, {useEffect, useState} from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllInactiveSensors } from '../../../(redux)/sensorSlice';
import { createAnimal } from '../../../(redux)/animalSlice';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const GENDER = [
  "male", "female"
]

const AddAnimal = () => {
  const isFocused = useIsFocused()
  const dispatch = useDispatch()
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchAllInactiveSensors());
  },[isFocused])

  const {sensors} = useSelector(state =>  state?.sensors) 
  
  
  const [weight, setWeight] = useState()
  const [height, setHeight] = useState()
  const [age, setAge] = useState()
  const [gender, setGender] = useState("") 
  const [sensorTag, setSensorTag] = useState("")
  const [description, setDescription] = useState("")
  
  
  const handleSubmit = async () => {
    if (
      weight === "" ||
      height === "" ||
      age === "" ||
      gender === "" ||
      sensorTag === "" ||
      description === ""
    ) {
      Alert.alert("Ensure you fill all fields");
      return;
    }
   
    dispatch(createAnimal({weight, height, age, gender, description, sensorTag}));
    setHeight(0)
    setWeight(0)
    setAge(0)
    setGender("")
    setSensorTag("")
    setDescription("")
    if(status === "Success") {
      return  navigation.navigate("index")
    }
  }

  const {status} = useSelector(state => state?.animals); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Animal</Text>
      <ScrollView style={styles.form}>
        <Text style={styles.labelText}>Weight(kg)</Text>
        <TextInput
          style={styles.input}
          placeholder="weight"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
        <Text style={styles.labelText}>Height(cm)</Text>
        <TextInput
          style={styles.input}
          placeholder="height"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
        />
        <Text style={styles.labelText}>Age (months)</Text>
        <TextInput
          style={styles.input}
          placeholder="age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        <View>
          <Text style={styles.labelText}>Gender</Text>
          <Picker
            selectedValue={gender}
            value={gender}
            onValueChange={(currentGender) => setGender(currentGender)}
            style={styles.picker}
          >
            {GENDER?.map((gender) => (
              <Picker.Item key={gender} label={gender} value={gender} />
            ))}
          </Picker>
        </View>

        <View>
          <Text style={styles.labelText}>Attach Sensor</Text>
          <Picker
            selectedValue={sensorTag}
            value={sensorTag}
            onValueChange={(currentSensorTag) => setSensorTag(currentSensorTag)}
            style={styles.picker}
          >
            <Picker.Item key="67gg" label="select a sensor" value="" />
            {
              sensors.length > 0 && (sensors?.map((sensor) => (
                <Picker.Item
                  key={sensor?._id}
                  label={sensor?.sensorTag}
                  value={sensor?.sensorTag}
                />
              ))) 
            }
          </Picker>
        </View>

        <Text style={styles.labelText}>Animal Description</Text>
        <TextInput
          style={styles.textarea}
          multiline={true}
          numberOfLines={10}
          placeholder="Animal Description"
          value={description}
          onChangeText={setDescription}
        />

        {/* Login Button */}
        <TouchableOpacity onPress={handleSubmit}>
          <View style={styles.button}>
            {status === "Loading" ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Add Animal</Text>
            )}
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default AddAnimal

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
  picker: {
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#666",
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
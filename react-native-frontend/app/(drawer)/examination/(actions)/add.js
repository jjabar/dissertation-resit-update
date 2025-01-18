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
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { fetchSensors } from '../../../(services)/api/api';
import { createExamination } from '../../../(redux)/examinationSlice';
import DropDown from '../../../../component/DropDown';

const GENDER = [
  "male", "female"
]

const AddExamination = () => {
  const isFocused = useIsFocused()
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [animals, setAnimals] = useState([])

  const fetchSensorsList = async () => {
    const { animals } = await fetchSensors();
    setAnimals([...animals])
  };

  useEffect(() => {
    fetchSensorsList();
  }, [isFocused]);

 
  
  
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [temperature, setTemperature] = useState("")
  const [heartBeat, setHeartBeat] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("") 
  const [animalTag, setAnimalTag] = useState("")
  const [comment, setComment] = useState("")
  
  
  const handleSubmit = async () => {
    if (
      weight === "" ||
      height === "" ||
      age === "" ||
      temperature === "" ||
      gender === "" ||
      heartBeat === "" ||
      animalTag === "" ||
      comment === ""
    ) {
      Alert.alert("Ensure you fill all fields");
      return;
    }
   
    dispatch(
      createExamination({
        weight,
        height,
        age,
        temperature,
        heartBeat,
        gender,
        comment,
        animalTag,
      })
    );
    setHeight("")
    setWeight("")
    setAge("")
    setGender("")
    setTemperature("")
    setHeartBeat("")
    setAnimalTag("")
    setComment("")
    if(status === "Success") {
      return  navigation.navigate("index")
    }
  }

  const {status} = useSelector(state => state?.examinations); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Examination</Text>
      <ScrollView style={styles.form}>
        <Text style={styles.labelText}>Select Animal</Text>
        <Picker
          selectedValue={animalTag}
          value={animalTag}
          onValueChange={(currentAnimalTag) => setAnimalTag(currentAnimalTag)}
          style={styles.picker}
        >
          <Picker.Item key="" label="select animal" value="" />
          {animals?.map((animal) => (
            <Picker.Item key={animal} label={animal} value={animal} />
          ))}
        </Picker>
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

        <Text style={styles.labelText}>Temperature (0c)</Text>
        <TextInput
          style={styles.input}
          placeholder="temperature"
          value={temperature}
          onChangeText={setTemperature}
          keyboardType="numeric"
        />

        <Text style={styles.labelText}>HeartBeat (per/min)</Text>
        <TextInput
          style={styles.input}
          placeholder="heartBeat"
          value={heartBeat}
          onChangeText={setHeartBeat}
          keyboardType="numeric"
        />

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

        <Text style={styles.labelText}>Health Comment</Text>
        <TextInput
          style={styles.textarea}
          multiline={true}
          numberOfLines={10}
          placeholder="Animal Comment"
          value={comment}
          onChangeText={setComment}
        />

        {/* Login Button */}
        <TouchableOpacity onPress={handleSubmit}>
          <View style={styles.button}>
            {status === "Loading" ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Save Examination</Text>
            )}
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default AddExamination

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
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from "react-native";
import React, {useEffect, useState} from 'react'
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllInactiveSensors } from "../../(redux)/sensorSlice";
import { getAnimalForEdit } from "../../(services)/api/api";
import { updateAnimal } from "../../(redux)/animalSlice";

const GENDER = ["male", "female"];

export default function EditAnimal() {
    const route = useRoute();
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { id } = route.params;

    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [sensorTag, setSensorTag] = useState("");
    const [description, setDescription] = useState("");
    const [fetchLoading, setFetchLoading] = useState(false)

    const fetchData = async () => {
      setFetchLoading(true);
      const animal = await getAnimalForEdit(id);
      
      setWeight(animal?.weight?.toString());
      setHeight(animal?.height?.toString());
      setAge(animal?.age?.toString());
      setGender(animal?.gender);
      setSensorTag(animal?.sensorNumber);
      setDescription(animal?.description);
      setFetchLoading(false);
    };

    useEffect(() => {
        fetchData();
        dispatch(fetchAllInactiveSensors());
      
    }, [id, isFocused, fetchAllInactiveSensors]);

    const { sensors } = useSelector((state) => state?.sensors);


   const handleSubmit = async () => {
     if (
       weight === "" ||
       height === "" ||
       age === "" ||
       sensorTag === "" ||
       gender === "" ||
       description === ""
     ) {
       Alert.alert("Ensure you fill all fields");
       return;
     }

     dispatch(
       updateAnimal({ weight, height, age, gender, description, sensorTag, animalId: id })
     );
     setHeight(0);
     setWeight(0);
     setAge(0);
     setGender("");
     setSensorTag("");
     setDescription("");
     if (status === "Success") {
       return navigation.navigate("(actions)");
     }
   };

   const { status } = useSelector((state) => state?.animals);

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

           <Text style={styles.title}>Edit Animal</Text>
           <ScrollView style={styles.form}>
             <Text style={styles.labelText}>Weight(kg)</Text>
             <TextInput
               style={styles.input}
               placeholder="weight"
               value={weight}
               onChangeText={setWeight}
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
             />

             <Text style={styles.labelText}>Gender</Text>
             <Picker
               selectedValue={gender}
               value={gender}
               onValueChange={(currentGender) => setGender(currentGender)}
               style={styles.input}
             >
             
               {GENDER?.map((gender) => (
                 <Picker.Item key={gender} label={gender} value={gender} />
               ))}
             </Picker>

             <Text style={styles.labelText}>Attach Sensor</Text>
             <Picker
               selectedValue={sensorTag}
               value={sensorTag}
               onValueChange={(currentSensorTag) =>
                 setSensorTag(currentSensorTag)
               }
               style={styles.input}
             >
               <Picker.Item key="" label="select a sensor" value="" />
               
               {sensors?.map((sensor) => (
                 <Picker.Item
                   key={sensor?._id}
                   label={sensor?.sensorTag}
                   value={sensor?.sensorTag}
                 />
               ))}
             </Picker>

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
                   <Text style={styles.buttonText}>Update Animal</Text>
                 )}
               </View>
             </TouchableOpacity>
           </ScrollView>
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
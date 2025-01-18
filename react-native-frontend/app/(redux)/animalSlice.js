import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../(services)/api/api";
import { Alert } from "react-native";
import { loadUserFromStorage } from "./authSlice";

const initialState = {
    animals: [],
    animal: {},
    status: null,
    message: null    
}


//create animal action
export const createAnimal = createAsyncThunk(
    "/animals/create-animal",
    async (payload, {rejectWithValue, getState, dispatch}) => {
        try{
            const { token } = await loadUserFromStorage();
            const {weight,height,age, gender,description,sensorTag} = payload;
            
            const response = await axios.post(
              `${base_url}/animals`,
              { weight, height, age, gender, description, sensorTag },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            
          
            return response?.data;
        }catch (error) {
            console.log(JSON.stringify(error))
            return rejectWithValue(error?.response?.data)
        } 
    }
);

//update animal action
export const updateAnimal = createAsyncThunk(
    "/animals/update-animal",
    async (payload, {rejectWithValue, getState, dispatch}) => {
        try{
            const { token } = await loadUserFromStorage();
            const { weight, height, age, gender, description, sensorTag, animalId } =
               payload;
            
            const response = await axios.put(
              `${base_url}/animals/${animalId}`,
               {weight,height,age, gender,description,sensorTag} ,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            
            
            return response?.data;
        }catch (error) {
            console.log(JSON.stringify(error))
            return rejectWithValue(error?.response?.data)
        } 
    }
);

//fetch  all animals action
export const fetchAllAnimals = createAsyncThunk(
    "/animals/fetch-all-animals",
    async (_, {rejectWithValue, getState, dispatch}) => {
        try{
            const { token } = await loadUserFromStorage();
            
            const response = await axios.get(
              `${base_url}/animals`,
              
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            
            
            return response?.data;
        }catch (error) {
            console.log(JSON.stringify(error))
            return rejectWithValue(error?.response?.data)
        } 
    }
);




//fetch animal by id action
export const fetchAnimal = createAsyncThunk(
    "/animals/fetch-animal-by-id",
    async (animalId, {rejectWithValue, getState, dispatch}) => {
        try{
            const { token } = await loadUserFromStorage();
            
            const response = await axios.get(
              `${base_url}/animals/${animalId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            
            
            return response?.data;
        }catch (error) {
            console.log(JSON.stringify(error))
            return rejectWithValue(error?.response?.data)
        } 
    }
);


//detach animal sensor action
export const detachAnimalSensor = createAsyncThunk(
    "/animals/detach-animal-sensor",
    async (payload, {rejectWithValue, getState, dispatch}) => {
        try{
            const { token } = await loadUserFromStorage();
            const {animalId, sensorNumber} = payload 
            const response = await axios.patch(
              `${base_url}/animals/${animalId}`,
              { sensorNumber},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
           
            dispatch(fetchAllAnimals())
            return response?.data;
        }catch (error) {
            console.log(JSON.stringify(error))
            return rejectWithValue(error?.response?.data)
        } 
    }
);



const animalSlice = createSlice({
    name: "Animals",
    initialState,
    extraReducers: (builder) => {
      //create animal
      builder.addCase(createAnimal.pending, (state) => {
        state.status = "Loading";
      });
      builder.addCase(createAnimal.fulfilled, (state, action) => {
        state.status = "Success";
        state.animal = action.payload.animal;
        state.animals = [...state.animals, action.payload.animal]
        state.message = action.payload.message;
        Alert.alert(action.payload.message);
      });
      builder.addCase(createAnimal.rejected, (state, action) => {
        state.animal = null;
        state.status = "Error";
        state.animals = state?.animals
        state.message = "Something went wrong";
        Alert.alert(action?.payload?.message || "Something went wrong");
      });

       builder.addCase(updateAnimal.pending, (state) => {
         state.status = "Loading";
       });
       builder.addCase(updateAnimal.fulfilled, (state, action) => {
         state.status = "Success";
         state.animal = action.payload.animal;
         state.message = action.payload.message;
         Alert.alert(action.payload.message);
       });
       builder.addCase(updateAnimal.rejected, (state, action) => {
         state.animal = null;
         state.status = "Error";
         state.animals = state.animals
         state.message = "Something went wrong";
         Alert.alert(action?.payload?.message || "Something went wrong");
       });

      //fetch all animals
      builder.addCase(fetchAllAnimals.pending, (state) => {
        state.status = "Loading";
      });
      builder.addCase(fetchAllAnimals.fulfilled, (state, action) => {
        state.status = "Success";
        state.animals = action.payload.animals;
        state.message = action.payload.message;
        
      });
      builder.addCase(fetchAllAnimals.rejected, (state, action) => {
        state.animals = null;
        state.status = "Error";
        state.message = "Something went wrong";
        Alert.alert(action?.payload?.message || "Something went wrong");
      });

      //fetch animal by Id
      builder.addCase(fetchAnimal.pending, (state) => {
        state.status = "Loading";
      });
      builder.addCase(fetchAnimal.fulfilled, (state, action) => {
        state.status = "Success";
        state.animal = action.payload.animal;
        state.message = action.payload.message;
        
      });
      builder.addCase(fetchAnimal.rejected, (state, action) => {
        state.animal = null;
        state.status = "Error";
        state.message = "Something went wrong";
        Alert.alert(action?.payload?.message || "Something went wrong");
      });

      //delete animal
      builder.addCase(detachAnimalSensor.pending, (state) => {
        state.status = "Loading";
      });
      builder.addCase(detachAnimalSensor.fulfilled, (state, action) => {
        state.status = "Success";
        state.animal = action.payload.animal;
        state.message = action.payload.message;
        Alert.alert(action.payload.message);
      });
      builder.addCase(detachAnimalSensor.rejected, (state, action) => {
        state.animal = null;
        state.status = "Error";
        state.message = "Something went wrong";
        Alert.alert(action?.payload?.message || "Something went wrong");
      });
    },
   
})

//generate the reducer
const animalReducer = animalSlice.reducer;

export default animalReducer; 
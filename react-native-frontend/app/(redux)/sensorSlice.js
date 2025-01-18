import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../(services)/api/api";
import { Alert } from "react-native";
import { loadUserFromStorage } from "./authSlice";

const initialState = {
    sensors: [],
    sensor: {},
    status: null,
    message: null    
}


//create sensor action
export const createSensor = createAsyncThunk(
    "/sensors/create-sensor",
    async (payload, {rejectWithValue, getState, dispatch}) => {
        try{
            const { token } = await loadUserFromStorage();
            const {description, productNumber} = payload;
            
            const response = await axios.post(
              `${base_url}/sensors`,
              { description, productNumber },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            
            
            return response?.data;
        }catch (error) {
            
            return rejectWithValue(error?.response?.data)
        } 
    }
);

//update sensor action
export const updateSensor = createAsyncThunk(
    "/sensors/update-sensor",
    async (payload, {rejectWithValue, getState, dispatch}) => {
        try{
            const { token } = await loadUserFromStorage();
            const {description, productNumber, sensorId} = payload;
            
            const response = await axios.put(
              `${base_url}/sensors/${sensorId}`,
              { description, productNumber },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            
            
            return response?.data;
        }catch (error) {
            
            return rejectWithValue(error?.response?.data)
        } 
    }
);

//fetch  all sensors action
export const fetchAllSensors = createAsyncThunk(
    "/sensors/fetch-all-sensors",
    async (_, {rejectWithValue, getState, dispatch}) => {
        try{
            const { token } = await loadUserFromStorage();
            
            const response = await axios.get(
              `${base_url}/sensors`,
              
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          
            
            return response?.data;
        }catch (error) {
           
            return rejectWithValue(error?.response?.data)
        } 
    }
);

//fetch  all inactive sensors action
export const fetchAllInactiveSensors = createAsyncThunk(
    "/sensors/fetch-all-inactive-sensors",
    async (_, {rejectWithValue, getState, dispatch}) => {
        try{
            const { token } = await loadUserFromStorage();
            
            const response = await axios.get(
              `${base_url}/sensors/get/inactive`,
              
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          
            
            return response?.data;
        }catch (error) {
           
            return rejectWithValue(error?.response?.data)
        } 
    }
);


//fetch sensor by id action
export const fetchSensor = createAsyncThunk(
    "/sensors/fetch-sensor-by-id",
    async (sensorId, {rejectWithValue, getState, dispatch}) => {
        try{
            const { token } = await loadUserFromStorage();
            
            const response = await axios.get(
              `${base_url}/sensors/${sensorId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            
            
            return response?.data;
        }catch (error) {
           
            return rejectWithValue(error?.response?.data)
        } 
    }
);


//delete sensor action
export const deleteSensor = createAsyncThunk(
    "/sensors/delete-sensor",
    async (sensorId, {rejectWithValue, getState, dispatch}) => {
        try{
            const { token } = await loadUserFromStorage();
            
            const response = await axios.delete(
              `${base_url}/sensors/${sensorId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log(response.data)
            return response?.data;
        }catch (error) {
            console.log(JSON.stringify(error))
            return rejectWithValue(error?.response?.data)
        } 
    }
);



const sensorSlice = createSlice({
    name: "Sensors",
    initialState,
    extraReducers: (builder) => {
      //create sensor
      builder.addCase(createSensor.pending, (state) => {
        state.status = "Loading";
      });
      builder.addCase(createSensor.fulfilled, (state, action) => {
        state.status = "Success";
        state.sensor = action.payload.sensor;
        state.sensors = [...state.sensors, action.payload.sensor]
        state.message = action.payload.message;
        Alert.alert(action.payload.message);
      });
      builder.addCase(createSensor.rejected, (state, action) => {
        state.sensor = null;
        state.status = "Error";
        state.sensors = state?.sensors
        state.message = "Something went wrong";
        Alert.alert(action?.payload?.message || "Something went wrong");
      });

       builder.addCase(updateSensor.pending, (state) => {
         state.status = "Loading";
       });
       builder.addCase(updateSensor.fulfilled, (state, action) => {
         state.status = "Success";
         state.sensor = action.payload.sensor;
         state.sensors = state?.sensors?.map((sensor) => {
           sensor?._id === action?.payload?.sensor?._id
             ? { ...action?.payload?.sensor }
             : sensor;
         });
         state.message = action.payload.message;
         Alert.alert(action.payload.message);
       });
       builder.addCase(updateSensor.rejected, (state, action) => {
         state.sensor = null;
         state.status = "Error";
         state.sensors = state.sensors
         state.message = "Something went wrong";
         Alert.alert(action?.payload?.message || "Something went wrong");
       });

      //fetch all sensors
      builder.addCase(fetchAllSensors.pending, (state) => {
        state.status = "Loading";
      });
      builder.addCase(fetchAllSensors.fulfilled, (state, action) => {
        state.status = "Success";
        state.sensors = action.payload.sensors;
        state.message = action.payload.message;
      });
      builder.addCase(fetchAllSensors.rejected, (state, action) => {
        state.sensors = null;
        state.status = "Error";
        state.message = "Something went wrong";
        Alert.alert(action?.payload?.message || "Something went wrong");
      });

      //fetch all inactive sensors
      builder.addCase(fetchAllInactiveSensors.pending, (state) => {
        state.status = "Loading";
      });
      builder.addCase(fetchAllInactiveSensors.fulfilled, (state, action) => {
        state.status = "Success";
        state.sensors = action.payload.sensors;
        state.message = action.payload.message;
      });
      builder.addCase(fetchAllInactiveSensors.rejected, (state, action) => {
        state.sensors = null;
        state.status = "Error";
        state.message = "Something went wrong";
        Alert.alert(action?.payload?.message || "Something went wrong");
      });

      //fetch sensor by Id
      builder.addCase(fetchSensor.pending, (state) => {
        state.status = "Loading";
      });
      builder.addCase(fetchSensor.fulfilled, (state, action) => {
        state.status = "Success";
        state.sensor = action.payload.sensor;
        state.message = action.payload.message;
        
      });
      builder.addCase(fetchSensor.rejected, (state, action) => {
        state.sensor = null;
        state.status = "Error";
        state.message = "Something went wrong";
        Alert.alert(action?.payload?.message || "Something went wrong");
      });

      //delete sensor
      builder.addCase(deleteSensor.pending, (state) => {
        state.status = "Loading";
      });
      builder.addCase(deleteSensor.fulfilled, (state, action) => {
        state.status = "Success";
        state.sensor = action.payload.sensor;
        state.sensors = state?.sensors?.filter(sensor => sensor._id !== state?.sensor?._id)
        state.message = action.payload.message;
        Alert.alert(action.payload.message);
      });
      builder.addCase(deleteSensor.rejected, (state, action) => {
        state.sensor = null;
        state.status = "Error";
        state.message = "Something went wrong";
        Alert.alert(action?.payload?.message || "Something went wrong");
      });
    },
   
})

//generate the reducer
const sensorReducer = sensorSlice.reducer;

export default sensorReducer; 
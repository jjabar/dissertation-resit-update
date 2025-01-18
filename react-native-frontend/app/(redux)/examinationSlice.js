import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../(services)/api/api";
import { Alert } from "react-native";
import { loadUserFromStorage } from "./authSlice";

const initialState = {
    examinations: [],
    examination: {},
    status: null,
    message: null    
}


//create examination action
export const createExamination = createAsyncThunk(
    "/examinations/create-examination",
    async (payload, {rejectWithValue, getState, dispatch}) => {
        try{
            const { token } = await loadUserFromStorage();
            const {
              weight,
              height,
              age,
              temperature,
              heartBeat,
              gender,
              comment,
              animalTag,
            } = payload;
            
            const response = await axios.post(
              `${base_url}/examinations`,
              {
                weight,
                height,
                age,
                temperature,
                heartBeat,
                gender,
                comment,
                animalTag,
              },
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

//update examination action
export const updateExamination = createAsyncThunk(
    "/examinations/update-examination",
    async (payload, {rejectWithValue, getState, dispatch}) => {
        try{
            const { token } = await loadUserFromStorage();
            const { weight, height, age, gender, description, sensorTag, examinationId } =
               payload;
            
            const response = await axios.put(
              `${base_url}/examinations/${examinationId}`,
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

//fetch  all examinations action
export const fetchAllExaminations = createAsyncThunk(
    "/examinations/fetch-all-examinations",
    async (_, {rejectWithValue, getState, dispatch}) => {
        try{
            const { token } = await loadUserFromStorage();
            
            const response = await axios.get(
              `${base_url}/examinations`,
              
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




//fetch examination by id action
export const fetchExamination = createAsyncThunk(
    "/examinations/fetch-examination-by-id",
    async (examinationId, {rejectWithValue, getState, dispatch}) => {
        try{
            const { token } = await loadUserFromStorage();
            
            const response = await axios.get(
              `${base_url}/examinations/${examinationId}`,
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


//detach examination sensor action
export const detachExaminationSensor = createAsyncThunk(
    "/examinations/detach-examination-sensor",
    async (payload, {rejectWithValue, getState, dispatch}) => {
        try{
            const { token } = await loadUserFromStorage();
            const {examinationId, sensorNumber} = payload 
            const response = await axios.patch(
              `${base_url}/examinations/${examinationId}`,
              { sensorNumber},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
           
            dispatch(fetchAllExaminations())
            return response?.data;
        }catch (error) {
            console.log(JSON.stringify(error))
            return rejectWithValue(error?.response?.data)
        } 
    }
);



const examinationSlice = createSlice({
    name: "Examinations",
    initialState,
    extraReducers: (builder) => {
      //create examination
      builder.addCase(createExamination.pending, (state) => {
        state.status = "Loading";
      });
      builder.addCase(createExamination.fulfilled, (state, action) => {
        state.status = "Success";
        state.examination = action.payload.examination;
        state.examinations = [...state.examinations, action.payload.examination]
        state.message = action.payload.message;
        Alert.alert(action.payload.message);
      });
      builder.addCase(createExamination.rejected, (state, action) => {
        state.examination = null;
        state.status = "Error";
        state.examinations = state?.examinations
        state.message = "Something went wrong";
        Alert.alert(action?.payload?.message || "Something went wrong");
      });

       builder.addCase(updateExamination.pending, (state) => {
         state.status = "Loading";
       });
       builder.addCase(updateExamination.fulfilled, (state, action) => {
         state.status = "Success";
         state.examination = action.payload.examination;
         state.message = action.payload.message;
         Alert.alert(action.payload.message);
       });
       builder.addCase(updateExamination.rejected, (state, action) => {
         state.examination = null;
         state.status = "Error";
         state.examinations = state.examinations
         state.message = "Something went wrong";
         Alert.alert(action?.payload?.message || "Something went wrong");
       });

      //fetch all examinations
      builder.addCase(fetchAllExaminations.pending, (state) => {
        state.status = "Loading";
      });
      builder.addCase(fetchAllExaminations.fulfilled, (state, action) => {
        state.status = "Success";
        state.examinations = action.payload.examinations;
        state.message = action.payload.message;
        
      });
      builder.addCase(fetchAllExaminations.rejected, (state, action) => {
        state.examinations = null;
        state.status = "Error";
        state.message = "Something went wrong";
        Alert.alert(action?.payload?.message || "Something went wrong");
      });

      //fetch examination by Id
      builder.addCase(fetchExamination.pending, (state) => {
        state.status = "Loading";
      });
      builder.addCase(fetchExamination.fulfilled, (state, action) => {
        state.status = "Success";
        state.examination = action.payload.examination;
        state.message = action.payload.message;
        
      });
      builder.addCase(fetchExamination.rejected, (state, action) => {
        state.examination = null;
        state.status = "Error";
        state.message = "Something went wrong";
        Alert.alert(action?.payload?.message || "Something went wrong");
      });

      //delete examination
      builder.addCase(detachExaminationSensor.pending, (state) => {
        state.status = "Loading";
      });
      builder.addCase(detachExaminationSensor.fulfilled, (state, action) => {
        state.status = "Success";
        state.examination = action.payload.examination;
        state.message = action.payload.message;
        Alert.alert(action.payload.message);
      });
      builder.addCase(detachExaminationSensor.rejected, (state, action) => {
        state.examination = null;
        state.status = "Error";
        state.message = "Something went wrong";
        Alert.alert(action?.payload?.message || "Something went wrong");
      });
    },
   
})

//generate the reducer
const examinationReducer = examinationSlice.reducer;

export default examinationReducer; 
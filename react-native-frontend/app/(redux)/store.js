import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import sensorReducer from "./sensorSlice";
import animalReducer from "./animalSlice";
import examinationReducer from "./examinationSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        sensors: sensorReducer,
        animals: animalReducer,
        examinations: examinationReducer,
    },
});